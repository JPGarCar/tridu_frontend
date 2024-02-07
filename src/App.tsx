import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";
import Participant from "./pages/Participant.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Heats from "./pages/Heats.tsx";
import CreateParticipant from "./pages/createNewUserParticipant/CreateParticipant.tsx";
import DataUpload from "./pages/dataUpload/DataUpload.tsx";
import Races from "./pages/Races.tsx";
import Admin from "./pages/Admin.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/heats" element={<Heats />} />
        <Route path="/races" element={<Races />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/participants">
          <Route path="/participants/:userId" element={<Participant />} />
          <Route path="/participants/create" element={<CreateParticipant />} />
        </Route>
        <Route path="/data/upload" element={<DataUpload />} />
      </Route>
    </Route>,
  ),
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
