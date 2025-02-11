import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "./UserNav";

export default function UserDashboard() {
  return (
    <div className="container-fluid d-flex flex-column m-0 vw-100">
      <UserNav />

      <main
        className="flex-grow-1 p-3 user-container overflow-y-scroll border"
        style={{
          backgroundImage: "url('https://media.istockphoto.com/id/1497909628/photo/cat-and-dog-sitting-together-on-meadow.jpg?s=612x612&w=0&k=20&c=zpZE3_h5u8pnkml1qPyX31KXuIodY8KQ1bwkH7BWc_Q=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(255, 255, 255, 0.75)", // White overlay directly on background
          backgroundBlendMode: "overlay", // Ensures the opacity applies to the background
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
