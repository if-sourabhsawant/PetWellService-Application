import React from "react";
import { NavLink } from "react-router-dom";

export default function SitterNav() {
  return (
    <div>
      <ul className="nav nav-pills nav-fill w-100 p-3">
        <li className="nav-item mx-3">
          <NavLink
            to="dashboard"
            aria-current="page"
            className={({ isActive }) => "nav-link" + (isActive ? " active bg-secondary" : " text-secondary border border-secondary rounded")}
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item mx-3">
          <NavLink
            to="appointments"
            aria-current="page"
            className={({ isActive }) => "nav-link " + (isActive ? " active bg-secondary" : "text-secondary border border-secondary rounded")}
          >
            Appointments
          </NavLink>
        </li>
        <li className="nav-item mx-3">
          <NavLink
            to="slots"
            aria-current="page"
            className={({ isActive }) => "nav-link " + (isActive ? " active bg-secondary" : "text-secondary border border-secondary rounded")}
          >
            Slots
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
