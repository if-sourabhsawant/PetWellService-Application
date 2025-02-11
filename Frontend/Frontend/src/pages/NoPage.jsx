import React from "react";
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <p className="lead">Oops! The page you&apos;re looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
