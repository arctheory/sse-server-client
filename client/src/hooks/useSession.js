import { useRef, useState } from 'react';

function useSession() {
    const subscribed = useRef(false);
    const [lastMessage, setLastMessage] = useState();

    const subscribe = () => {
        if (subscribed.current) {
            return;
        }

        const sse = new EventSource('http://localhost:8000/subscribe', {
            withCredentials: true
        });
        sse.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setLastMessage(data);
            } catch(_) {}
        };
        subscribed.current = true;
    };

    return {
        lastMessage,
        subscribe
    };
}

export default useSession;
