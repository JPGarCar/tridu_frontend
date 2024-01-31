import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import React from "react";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./services/ProtectedRoute..tsx";
import Participant from "./pages/Participant.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Heats from "./pages/Heats.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/heats" element={<Heats />} />
                <Route path="/participants/:userId" element={<Participant />} />
            </Route>
        </Route>
    )
)

const App: React.FC = () => {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
