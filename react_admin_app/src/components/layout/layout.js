import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Header from '../header';
import './style.css';

export default function Layout({children}) {
  return (
    <div>
        <Header/>
        <Container fluid>
          <Row>
            <Col md={2} className='side-bar'>
              <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/categories'>Categories</NavLink></li>
                <li><NavLink to='/products'>Products</NavLink></li>
                <li><NavLink to='/orders'>Orders</NavLink></li>
              </ul>
            </Col>
            <Col md={10} className='panel'>{children}</Col>
          </Row>
        </Container>
        
    </div>
  )
}
