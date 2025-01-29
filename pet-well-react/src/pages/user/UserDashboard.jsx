import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'

export default function UserDashboard() {
  return (
    <div className="container-fluid d-flex flex-row m-0 vw-100">

    <UserSidebar />
    <main className="flex-grow-1 p-3 dashboard-container overflow-y-scroll">
        <Outlet />

    </main>

</div>
  )
}
