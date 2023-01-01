const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const PORT = 8000;
// response header for sever-sent events
const SSE_RESPONSE_HEADER = {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no'
};

const app = express();
const storage = {};
const connections = {};

const sessionStorage = new Proxy(storage, {
    set(target, key, newValue) {
        target[key] = newValue;
        if (key in connections && typeof connections[key] === 'function') {
            console.log('Sending update...');
            connections[key](JSON.stringify(target[key]));
        }
        return true;
    }
});

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'local server',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(async (req, res, next) => {
    if (!['/', '/start'].includes(req.path)) {
        const sessionId = req.sessionID;
        console.log(sessionId, sessionStorage);
        if (!(sessionId in sessionStorage)) {
            res.status(401).json({
                success: false,
                error: 'Uninitialized session.'
            });
            return;
        }
    }
    next();
});

app.get('/', async (_, res) => {
    res.send('SSE server v0.1.');
    return;
});

app.get('/start', async (req, res) => {
    const sessionId = req.sessionID;
    sessionStorage[sessionId] = {};
    res.json({ sessionId });
    return;
});

app.post('/data', async (req, res) => {
    const sessionId = req.sessionID;
    const body = req.body;
    sessionStorage[sessionId] = {...sessionStorage[sessionId], ...body};
    res.json({ success: true });
    return;
});

app.get('/subscribe', async (req, res) => {
    res.writeHead(200, SSE_RESPONSE_HEADER);
    connections[req.sessionID] = (data) => {
        res.write(`data: ${data}\n\n`);
        console.info('Response sent!');
    };
});

app.listen(PORT, () => {
    console.info(`Server listening at http://localhost:${PORT}`);
});
