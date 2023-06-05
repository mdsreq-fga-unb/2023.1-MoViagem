import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthProviderComponent from "./auth/components/auth-context-component";
import ProtectedComponent from "./auth/components/protected-component";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes that need to access the auth context need to be inside this route */}
      <Route element={<AuthProviderComponent />}>
        <Route path="/login" element={<Login />} />
        {/* Routes that need login need to be inside this route */}
        <Route element={<ProtectedComponent />}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

export default router;
