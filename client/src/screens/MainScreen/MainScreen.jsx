import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import Island from '../../components/layouts/Island';
import useSession from '../../hooks/useSession';
import { Caption, Container, Logo, SafeArea, Title } from './Styles';

function MainScreen() {
    const { lastMessage, subscribe } = useSession();
    const [appState, setAppState] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        console.log({ lastMessage });
    }, [lastMessage]);

    const handleInit = async () => {
        if (appState !== 0 || isLoading) {
            return;
        }
        setLoading(true);
        const res = await fetch('http://localhost:8000/start', {
            credentials: "include"
        });
        if (res.ok) {
            subscribe();
            setAppState(1);
        }
        setLoading(false);
    };

    const sendMessage = (data) => {
        return fetch('http://localhost:8000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify(data),
            credentials: "include"
        })
    }

    const handleFullname = async () => {
        if (appState !== 1 || isLoading) {
            return;
        }
        setLoading(true);
        const res = await sendMessage({ name });
        if (res.ok) {
            setAppState(2);
        }
        setLoading(false);
    };

    const handleEmail = async () => {
        if (appState !== 2 || isLoading) {
            return;
        }
        setLoading(true);
        const res = await sendMessage({ email });
        if (res.ok) {
            setAppState(3);
        }
        setLoading(false);
    };

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    return (
        <Container>
            <Logo>✦ Formstar</Logo>
            <SafeArea>
                <Island inactive={appState !== 0}>
                    <Title>Get Started</Title>
                    <Caption>Start the process, click 'Continue' to begin.</Caption>
                    {appState === 0 && (<>
                        <Button
                            isLoading={appState === 'INIT' && isLoading}
                            onClick={handleInit}>
                                Continue
                        </Button>            
                    </>)}
                </Island>
                <Island visible={appState > 0} inactive={appState > 1}>
                    <Title>Your Name</Title>
                    <Caption>Provide your official full name and click 'Next'.</Caption>
                    {appState === 1 && (<>
                        <TextInput onChange={handleNameChange} placeholder="Naruto Uzumaki" />
                        <Button
                            isLoading={appState === 1 && isLoading}
                            onClick={handleFullname}>
                                Next
                        </Button>            
                    </>)}
                </Island>
                <Island visible={appState > 1} inactive={appState > 2}>
                    <Title>Business Email</Title>
                    <Caption>Provide your business email and click 'Next'.</Caption>
                    {appState === 2 && (<>
                        <TextInput onChange={handleEmailChange} placeholder="naruto@leaf.com" />
                        <Button
                            isLoading={appState === 2 && isLoading}
                            onClick={handleEmail}>
                                Next
                        </Button>
                    </>)}
                </Island>
                <Island visible={appState > 2}>
                    <Title>Completed!</Title>
                    <Caption>Recorded your details will reach out to you shortly.</Caption>
                </Island>
            </SafeArea>
        </Container>
    );
}

export default MainScreen;
