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
import ParticipantList from "./pages/ParticipantList";
import Schedule from "./pages/Schedule";
import TravelInfo from "./pages/TravelInfo";
import TravelList from "./pages/TravelList";

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
          <Route path="/travels" element={<TravelList />} />
          <Route path="/travel-info/:id" element={<TravelInfo />} />
          <Route path="/create-transport/:id" element={<CreateTransport />} />
          <Route path="/edit-transport/:id" element={<EditTransport />} />
          <Route path="/create-stay/:id" element={<CreateStay />} />
          <Route path="/edit-stay/:id" element={<EditStay />} />
          <Route path="/schedule/:id" element={<Schedule />} />
          <Route path="/participants-list/:id" element={<ParticipantList />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
