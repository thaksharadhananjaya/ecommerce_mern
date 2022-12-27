import { React, useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { login } from '../../actions/auth_actions'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Input from '../../components/input';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


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
                            <Input
                                controlId="formEmail"
                                label="Email Address"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                controlId="formPassword"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />

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
