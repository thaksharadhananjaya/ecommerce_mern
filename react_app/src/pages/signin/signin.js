import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

export default function Signin() {
    return (
        <div>
            <Container>
                <Row style={{ marginBottom: '24px', marginTop: '48px' }}>
                    <div  class="d-flex justify-content-center">
                        <h3>Signin in to your admin account</h3>
                    </div>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
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
