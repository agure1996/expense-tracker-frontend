import React from 'react';
import { Link } from 'react-router-dom'; 
import { Container, Button } from 'reactstrap'; // Assuming 
import './NotFound.css'; 
import HomeNavbar from '../HomeNavbar';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <HomeNavbar /> 
      <Container className="text-center">
        <h1 className="display-2 not-found-heading">404</h1>
        <p className="lead not-found-lead">Page Not Found</p>
        <Button className="not-found-button" tag={Link} to="/">
          Return to Homepage
        </Button>
      </Container>
    </div>
  );
};

export default NotFound;
