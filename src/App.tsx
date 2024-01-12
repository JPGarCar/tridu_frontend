import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import React from "react";
import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthServiceProvider } from "./context/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute..tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
        </Route>
    )
)

const App: React.FC = () => {
  return (
      <>
          <AuthServiceProvider>
              <CssBaseline />
              <PrimaryAppBar />
              <Box component="main">
                  <RouterProvider router={router} />
              </Box>
          </AuthServiceProvider>
      </>
  )
}

export default App;
