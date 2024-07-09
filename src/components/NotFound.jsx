import React from 'react';
import { Container, Button } from 'reactstrap';
import HomeNavbar from './HomeNavbar';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <>
    <HomeNavbar />
    <Container className="text-center">
      <h1 className="display-3">404</h1>
      <p className="lead">Page Not Found</p>
      <Button color="gray" tag={Link}  to="/">
        Go to Home
      </Button>
    </Container>
    </>
  );
};

export default NotFound;
