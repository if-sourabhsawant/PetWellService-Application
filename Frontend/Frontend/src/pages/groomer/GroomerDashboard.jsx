import React from "react";
import { Outlet } from "react-router-dom";
import GroomerNav from "./GroomerNav";

export default function GroomerDashboard() {
  return (
    <div className="container-fluid d-flex flex-column m-0 vw-100">
      <GroomerNav />
      <main
        className="flex-grow-1 p-3 user-container overflow-y-scroll border"
        style={{
          backgroundImage: "url('https://media.istockphoto.com/id/969077342/photo/a-chinese-female-dog-groomer-grooming-a-cavalier-king-charles-spaniel-dog.jpg?s=612x612&w=0&k=20&c=ZAht9ssNYTRoh-9RPw3XjgaDR-cuwsVpTYiyJU0DYs8=')",
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