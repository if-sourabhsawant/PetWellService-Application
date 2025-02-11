import React from "react";
import { Outlet } from "react-router-dom";
import SitterNav from "./SitterNav";

export default function SitterDashboard() {
  return (
    <div className="container-fluid d-flex flex-column m-0 vw-100">
      <SitterNav />

      <main
        className="flex-grow-1 p-3 user-container overflow-y-scroll border"
        style={{
          backgroundImage: "url('https://media.istockphoto.com/id/1308719194/photo/golden-retriver-dog-taking-a-shower-in-a-pet-grooming-salon.jpg?s=612x612&w=0&k=20&c=PM8Mnp4J3a8pO0i3aVFmd58JQnDycEOmbZy2kL_hPFo=')",
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
