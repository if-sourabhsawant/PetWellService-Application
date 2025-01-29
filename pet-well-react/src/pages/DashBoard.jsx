import React, { useEffect } from 'react'
import UserCard from '../components/UserCard'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashBoard({ user }) {
    // const dispatch = useDispatch();
    // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // const user = useSelector((state) => state.user.userInfo);
    // const navigation = useNavigate();



    return (
        <>
            <div className="container-fluid d-flex flex-row m-0 vw-100">

                <Sidebar />
                <main className="flex-grow-1 p-3 dashboard-container overflow-y-scroll">
                    <Outlet />

                </main>

            </div>
            {/* !isAuthenticated && user && <UserCard firstName={user.firstName} lastName={user.lastName} role={user.role.roleName} /> */}
        </>

    )
}
