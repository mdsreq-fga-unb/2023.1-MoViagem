import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthProviderComponent from "./auth/components/auth-context-component";
import ProtectedComponent from "./auth/components/protected-component";
import CreateTravel from "./pages/CreateTravel";
import EditUserInfo from "./pages/EditUserInfo";
import Home from "./pages/Home";
import LoginAndRegister from "./pages/LoginAndRegister";

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
        </Route>
      </Route>
    </>
  )
);

export default router;
