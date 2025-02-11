import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import UserRegistration from "./pages/UserRegistration";
import VeterinaryRegistration from "./pages/VeterinaryRegistration";
import ShopSearchPage from "./pages/ShopSearchPage";
import GroomerSearchPage from "./pages/GroomerSearchPage";
import VeterinarySearchPage from "./pages/VeterinarySearchPage";
import SitterSearchPage from "./pages/SitterSearchPage";
import SitterRegistration from "./pages/SitterRegistration";
import GroomerRegistration from "./pages/GroomerRegistration";
import Login from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import ManageUserList from "./pages/admin/ManageUserList";
import VeterinaryList from "./pages/admin/VeterinaryList";
import VeterinaryRequest from "./pages/admin/VeterinaryRequest";
import GroomerList from "./pages/admin/GroomerList";
import GroomerRequests from "./pages/admin/GroomerRequests";
import SitterList from "./pages/admin/SitterList";
import SitterRequests from "./pages/admin/SitterRequests";
import PetsList from "./pages/admin/PetsList";
import PetsCategory from "./pages/admin/PetsCategory";
import FoodShopList from "./pages/admin/FoodShopList";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserBookVeterinaryAppointments from "./pages/user/UserBookVeterinaryAppointments";
import UserBookSitterAppointments from "./pages/user/UserBookSitterAppointments";
import UserBookGroomerAppointments from "./pages/user/UserBookGroomerAppointments";
import UserAppointments from "./pages/user/UserAppointments";
import UserPets from "./pages/user/UserPets";
import VeterinaryDashboard from "./pages/veterinary/VeterinaryDashboard";
import VeterinaryProfile from "./pages/veterinary/VeterinaryProfile";
import VeterinaryAppointments from "./pages/veterinary/VeterinaryAppointments";
import VeterinarySlots from "./pages/veterinary/VeterinarySlots";
import SitterDashboard from "./pages/sitter/SitterDashboard";
import SitterProfile from "./pages/sitter/SitterProfile";
import SitterAppointments from "./pages/sitter/SitterAppointments";
import SitterSlots from "./pages/sitter/SitterSlots";
import GroomerDashboard from "./pages/groomer/GroomerDashboard";
import GroomerProfile from "./pages/groomer/GroomerProfile";
import GroomerAppointments from "./pages/groomer/GroomerAppointments";
import GroomerSlots from "./pages/groomer/GroomerSlots";

import FoodShopRegistration from "./pages/FoodShopRegistration";
import SitterLearnMore from "./pages/SitterLearnMore";
import GroomerLearnMore from "./pages/GroomerLearnMore";
import VeterinaryLearnMore from "./pages/VeterinaryLearnMore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="food-shops" element={<ShopSearchPage />} />
          <Route path="groomers" element={<GroomerSearchPage />} />
          <Route path="veterinarians" element={<VeterinarySearchPage />} />
          <Route path="sitters" element={<SitterSearchPage />} />
          <Route path="sitterslearnmore" element={<SitterLearnMore />} />
          <Route path="groomers-learnmore" element={<GroomerLearnMore />} />
          <Route path="veterinarianslearnmore" element={<VeterinaryLearnMore />} />
          <Route path="register">
            <Route path="user" element={<UserRegistration />} />
            <Route path="veterinary" element={<VeterinaryRegistration />} />
            <Route path="sitter" element={<SitterRegistration />} />
            <Route path="groomer" element={<GroomerRegistration />} />
            <Route path="food-shop" element={<FoodShopRegistration />} />
            <Route index element={<Navigate to="user" replace />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />

          <Route path="admin" element={<ProtectedRoute requiredRole={"ROLE_ADMIN"} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashBoard />}>
              <Route index element={<Navigate to="users" replace />} />
              <Route path="users" element={<ManageUserList />} />
              <Route path="veterinary">
                <Route path="list" element={<VeterinaryList />} />
                <Route path="requests" element={<VeterinaryRequest />} />
              </Route>
              <Route path="groomer">
                <Route path="list" element={<GroomerList />} />
                <Route path="requests" element={<GroomerRequests />} />
              </Route>
              <Route path="sitter">
                <Route path="list" element={<SitterList />} />
                <Route path="requests" element={<SitterRequests />} />
              </Route>
              <Route path="pets">
                <Route path="list" element={<PetsList />} />
                <Route path="category" element={<PetsCategory />} />
              </Route>
              <Route path="food-shop" element={<FoodShopList />} />
            </Route>
          </Route>

          <Route path="user" element={<ProtectedRoute requiredRole={"ROLE_USER"} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route element={<UserDashboard />}>
              <Route path="dashboard" element={<UserProfile />} />
              <Route path="appointments">
                <Route path="veterinary/:id" element={<UserBookVeterinaryAppointments />} />
                <Route path="sitter/:id" element={<UserBookSitterAppointments />} />
                <Route path="groomer/:id" element={<UserBookGroomerAppointments />} />
                <Route index element={<UserAppointments />} />
              </Route>

              <Route path="pets" element={<UserPets />} />
            </Route>
          </Route>

          <Route path="veterinary" element={<ProtectedRoute requiredRole={"ROLE_VETERINARY"} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route element={<VeterinaryDashboard />}>
              <Route path="dashboard" element={<VeterinaryProfile />} />
              <Route path="appointments" element={<VeterinaryAppointments />} />
              <Route path="slots" element={<VeterinarySlots />} />
            </Route>
          </Route>

          <Route path="sitter" element={<ProtectedRoute requiredRole={"ROLE_SITTER"} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route element={<SitterDashboard />}>
              <Route path="dashboard" element={<SitterProfile />} />
              <Route path="appointments" element={<SitterAppointments />} />
              <Route path="slots" element={<SitterSlots />} />
            </Route>
          </Route>

          <Route path="groomer" element={<ProtectedRoute requiredRole={"ROLE_GROOMER"} />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route element={<GroomerDashboard />}>
              <Route path="dashboard" element={<GroomerProfile />} />
              <Route path="appointments" element={<GroomerAppointments />} />
              <Route path="slots" element={<GroomerSlots />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
