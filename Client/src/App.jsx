
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import CrudPage from './pages/CrudPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const handleLogin = () => {
      setIsLoggedIn(true);
    };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage onLogin={handleLogin}/>,
    },
    {
      path: "/crud",
      element: <CrudPage />,
    },
  ]);

  
  console.log(isLoggedIn);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );

}





