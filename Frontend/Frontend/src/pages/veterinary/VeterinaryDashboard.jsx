import React from "react";
import { Outlet } from "react-router-dom";
import VeterinaryNav from "./VeterinaryNav";

export default function VeterinaryDashboard() {
  return (
    <div className="container-fluid d-flex flex-column m-0 vw-100">
      <VeterinaryNav />
      <main
        className="flex-grow-1 p-3 user-container overflow-y-scroll border"
        style={{
          backgroundImage: "url('https://koala.sh/api/image/v2-6bn88-xcm0b.jpg?width=1344&')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(255, 255, 255, 0.75)", 
          backgroundBlendMode: "overlay", 
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
