import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthProviderComponent from "./auth/components/auth-context-component";
import ProtectedComponent from "./auth/components/protected-component";
import CreateTravel from "./pages/CreateTravel";
import TravelInfo from "./pages/TravelInfo";
import LoginAndRegister from "./pages/LoginAndRegister";
import Travels from "./pages/Travels";
import CreateStay from "./pages/CreateStay";
import EditStay from "./pages/EditStay";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes that need to access the auth context need to be inside this route */}
      <Route element={<AuthProviderComponent />}>
        <Route path="/create-travel" element={<CreateTravel />} />
        <Route path="/travel-info" element={<TravelInfo />} />
        <Route path="/create-stay" element={<CreateStay />} />
        <Route path="/edit-stay" element={<EditStay />} />
        <Route path="/login-and-register" element={<LoginAndRegister />} />
        {/* Routes that need login need to be inside this route */}
        <Route element={<ProtectedComponent />}>
          <Route path="/" element={<Travels />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
