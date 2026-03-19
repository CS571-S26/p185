import React, {useState} from 'react';
import {Container, Card, Form, Button, Alert, Collapse} from 'react-bootstrap';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    //login, sign up toggle
    const [isLogin, setIsLogin] = useState(true);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const email = data.email;
        const password = data.password;
        const password_confirmation = data.password_confirmation;
        const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!isLogin && (password !== password_confirmation)) {
            setError(<>
                <p>Password does not match<br/></p>
            </>);
            return;
        }
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/');
        } catch (err) {
            switch (err.code) {
                case "auth/password-does-not-meet-requirements": {
                    const match = err.message.match(/\[(.*?)\]/);
                    const requirements = match[1].split(',').map(item => {
                        return (<p>- {item.trim()}<br/></p>)
                    });
                    setError(<>
                        <p>Missing password requirements:<br/></p>
                        {requirements}
                        </>);
                    break;
                }
                case "auth/invalid-credential":
                    setError("Wrong email or password");
                    break;
                case "auth/email-already-in-use":
                    setError("Email already in use");
            }
            console.error(err.code);
            console.error(err.message);
        }
    };

    return (<Container className="d-flex align-items-center justify-content-center" style={{minHeight: "80vh"}}>
        <div className="w-100" style={{maxWidth: "600px"}}>
            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4 fw-bold text-danger">
                        {isLogin ? 'Login to Scoop' : 'Join Scoop & Pull'}
                    </h2>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3" controlId="email">
                            <Form.Label column={"lg"}>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="Enter your email"
                                name="email"
                            />
                        </Form.Group>

                        <Form.Group id="password" className="mb-4" controlId="password">
                            <Form.Label column={"lg"}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder="Enter password"
                                name="password"
                            />
                        </Form.Group>

                        <Collapse in={!isLogin}>
                            <Form.Group className="mb-3" controlId="password_confirmation">
                                <Form.Label column={"lg"}>Confirm Password</Form.Label>
                                <Form.Control
                                    disabled={isLogin}
                                    type="password"
                                    required
                                    placeholder="Confirm Password"
                                    name="password_confirmation"/>
                            </Form.Group>
                        </Collapse>

                        <Button className="w-100 fw-bold mb-3" variant="danger" type="submit">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </Form>

                    <div className="text-center">
                        <button
                            className="btn btn-link text-decoration-none text-muted"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </Container>);
};

export default Login;