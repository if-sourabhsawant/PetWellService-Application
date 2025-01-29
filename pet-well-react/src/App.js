import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegistration from "./pages/UserRegistration";
import VeterinaryRegistration from "./pages/VeterinaryRegistration";
import GroomerRegistration from "./pages/GroomerRegistration";
import SitterRegistration from "./pages/SitterRegistration";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import Login from "./pages/LoginPage";
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
import PetsBreeds from "./pages/admin/PetsBreeds";
import UserDashboard from "./pages/user/UserDashboard";
import VeterinaryDashboard from "./pages/veterinary/VeterinaryDashboard";
import SitterDashboard from "./pages/sitter/SitterDashboard";
import GroomerDashboard from "./pages/groomer/GroomerDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="user-registration" element={<UserRegistration />} />
          <Route
            path="veterinary-registration"
            element={<VeterinaryRegistration />}
          />
          <Route path="sitter-registration" element={<SitterRegistration />} />
          <Route
            path="groomer-registration"
            element={<GroomerRegistration />}
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
          <Route path="admin">
            <Route path="dashboard" element={<DashBoard />}>
              <Route path="manage-users" element={<ManageUserList />} />
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
                <Route path="breed" element={<PetsBreeds />} />
              </Route>
            </Route>
          </Route>

          <Route path="user">
            <Route path="dashboard" element={<UserDashboard/>}></Route>
          </Route>
          <Route path="veterinary">
            <Route path="dashboard" element={<VeterinaryDashboard />}></Route>
          </Route>
          <Route path="sitter">
            <Route path="dashboard" element={<SitterDashboard />}></Route>
          </Route>
          <Route path="groomer">
            <Route path="dashboard" element={<GroomerDashboard />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
