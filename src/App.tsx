import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import React from "react";
import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthServiceProvider } from "./context/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute..tsx";
import Participant from "./pages/Participant.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/participant/:userId" element={<ProtectedRoute> <Participant /> </ProtectedRoute>} />
        </Route>
    )
)

const App: React.FC = () => {
  return (
      <Box sx={{ height: "100%" }}>
          <AuthServiceProvider>
              <CssBaseline />
              <PrimaryAppBar />
              <Box component="main" sx={{ height: "90%" }}>
                  <RouterProvider router={router} />
              </Box>
          </AuthServiceProvider>
      </Box>
  )
}

export default App;
