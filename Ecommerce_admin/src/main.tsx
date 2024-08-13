import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./Component/MainPage.tsx";
import VenderLoginPage from "./Component/VendorAll/VenderLoginPage.tsx";
import VenderSignUpPage from "./Component/VendorAll/VenderSignUpPage.tsx";
import "./index.css";
import UserProvider from "./UserProvider.tsx";

const routes = createBrowserRouter([
  {
    path: "/signUpPage",
    element: <VenderSignUpPage />,
  },
  {
    path: "/loginPage",
    element: <VenderLoginPage />,
  },
  {
    path: "/*",
    element: <MainPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  </React.StrictMode>
);
