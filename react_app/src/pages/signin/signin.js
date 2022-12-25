import { React, useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { login, isUserLoggedIn} from '../../actions/auth_actions'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(()=>{
        if(!auth.authenticate)
            dispatch(isUserLoggedIn());
    },[]);

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        }
        dispatch(login(user));
    }

    if (auth.authenticate)
        return <Navigate replace to="/" />;
    return (
        <div>
            <Container>
                <Row style={{ marginBottom: '24px', marginTop: '48px' }}>
                    <div className="d-flex justify-content-center">
                        <h3>Signin in to your admin account</h3>
                    </div>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Signin
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}
