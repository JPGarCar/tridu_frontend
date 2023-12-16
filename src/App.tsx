import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import React from "react";
import {CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
        </Route>
    )
)

const App: React.FC = () => {
  return (
      <>
          <CssBaseline />
          <PrimaryAppBar />
          <RouterProvider router={router} />
      </>
  )
}

export default App;
