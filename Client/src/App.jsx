
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import CrudPage from './pages/CrudPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


export default function App() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/crud",
      element: <CrudPage />,
    },
  ]);

  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );

}





