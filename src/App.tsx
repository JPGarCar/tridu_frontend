import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import React from "react";
import {CssBaseline} from "@mui/material";


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
          <RouterProvider router={router} />
      </>
  )
}

export default App;
