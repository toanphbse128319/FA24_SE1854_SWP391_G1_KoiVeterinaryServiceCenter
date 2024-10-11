import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../pages/Login';

const AboutUs = () => {
  return (
    <div>
      <h1>About Us</h1>
      <Link to="Login">
        <button>AboutUs</button>
      </Link>
    </div>
  );
};

export default AboutUs;


