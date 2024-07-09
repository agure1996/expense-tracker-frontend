import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";

const HomeNavbar = () => {

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Expense Tracker App</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/categories">Categories</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/expenses">Expenses</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default HomeNavbar;

