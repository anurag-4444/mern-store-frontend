import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedAccess = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="text-danger">Oops! Unauthorized Access</h2>
          <p className="lead">
            Looks like you took a wrong turn in the intergalactic space. 🚀
            Only admin astronauts are allowed here! Please{' '}
            <Link to="/auth/google">login</Link> as an admin if you have the
            right clearance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
