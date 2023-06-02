import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
    </Route>
  )
);

export default router;
