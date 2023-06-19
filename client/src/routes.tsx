import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthProviderComponent from "./auth/components/auth-context-component";
import ProtectedComponent from "./auth/components/protected-component";
import CreateStay from "./pages/CreateStay";
import CreateTransport from "./pages/CreateTransport";
import CreateTravel from "./pages/CreateTravel";
import EditStay from "./pages/EditStay";
import EditTransport from "./pages/EditTransport";
import EditUserInfo from "./pages/EditUserInfo";
import Home from "./pages/Home";
import LoginAndRegister from "./pages/LoginAndRegister";
import TravelInfo from "./pages/TravelInfo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes that need to access the auth context need to be inside this route */}
      <Route element={<AuthProviderComponent />}>
        <Route path="/login-and-register" element={<LoginAndRegister />} />
        {/* Routes that need login need to be inside this route */}
        <Route element={<ProtectedComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/user-info" element={<EditUserInfo />} />
          <Route path="/create-travel" element={<CreateTravel />} />
          <Route path="/create-transport/:id" element={<CreateTransport />} />
          <Route path="/edit-transport/:id" element={<EditTransport />} />
          <Route path="/travel-info/:id" element={<TravelInfo />} />
          <Route path="/create-stay/:id" element={<CreateStay />} />
          <Route path="/edit-stay/:id" element={<EditStay />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
