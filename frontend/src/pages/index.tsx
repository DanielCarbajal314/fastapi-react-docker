import { NavBar } from "../shared/components/NavBar";
import { Projects } from "./Projects";
import { Status } from "./Status";
import { Users } from "./Users";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route index element={<Projects />} />
        <Route path="projects" element={<Projects />} />
        <Route path="users" element={<Users />} />
        <Route path="status" element={<Status />} />
      </Routes>
    </Router>
  );
}
