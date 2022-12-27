import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth_actions';

const Header = (props) => {
  const dispatch = useDispatch();
  const userLogout = ()=>{
    dispatch(logout());
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
      <Container fluid >
        <Link to = '/' className='navbar-brand'>Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link onClick={userLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;