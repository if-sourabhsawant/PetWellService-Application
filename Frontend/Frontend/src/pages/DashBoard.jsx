import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashBoard() {
  return (
    <div className="container-fluid d-flex flex-row m-0 vw-100">
      <Sidebar />
      <main className="flex-grow-1 p-3 dashboard-container overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
