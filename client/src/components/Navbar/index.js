import React from 'react';
import { Nav, NavLink, NavMenu } from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/register" activeStyle>
            Register
          </NavLink>
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="/map" activeStyle>
            Map
          </NavLink>
          <NavLink to="/contact" activeStyle>
            Contact Us
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
