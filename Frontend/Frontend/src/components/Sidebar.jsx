import React, { useEffect } from "react";

import { Link } from "react-router-dom";
export default function Sidebar() {
  useEffect(() => {}, []);

  return (
    <nav className=" p-3 sidebar  side-bar-height border" style={{ width: "280px" }}>
      <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
        <span className="fs-5 fw-semibold">Admin Dashboard</span>
      </a>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <Link className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" aria-expanded="false" to="users">
            Users
          </Link>
        </li>

        <li className="mb-1 w-100">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#veterinary-collapse"
            aria-expanded="false"
          >
            Veterinary
          </button>
          <div className="collapse" id="veterinary-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to="veterinary/requests" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  Request
                </Link>
              </li>
              <li>
                <Link to="veterinary/list" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  Manage Veterinary
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#groomer-collapse"
            aria-expanded="false"
          >
            Groomer
          </button>
          <div className="collapse" id="groomer-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to="groomer/requests" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  New Grooming Request
                </Link>
              </li>
              <li>
                <Link to="groomer/list" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  Manage Groomers
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#sitter-collapse"
            aria-expanded="false"
          >
            Sitters
          </button>
          <div className="collapse" id="sitter-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to="sitter/requests" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  New Sitter Request
                </Link>
              </li>
              <li>
                <Link to="sitter/list" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  Sitter Groomers
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#pets-collapse"
            aria-expanded="false"
          >
            Pets
          </button>
          <div className="collapse" id="pets-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to="pets/list" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  List
                </Link>
              </li>
              <li>
                <Link to="pets/category" className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  Categories
                </Link>
              </li>
              
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <Link className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" aria-expanded="false" to="food-shop">
            Food Shop
          </Link>
        </li>
      </ul>
    </nav>
  );
}
