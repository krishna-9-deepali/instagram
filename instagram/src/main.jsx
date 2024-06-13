import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {
  Profile,
  Home,
  Login,
  Signup,
  AuthLayout,
  Createpost,
  Post,
  EditPost,
  Reels,
} from "./components/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication>
            <Home />,
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />,
          </AuthLayout>
        ),
      },
      {
        path: "/createpost",
        element: (
          <AuthLayout authentication>
            <Createpost />,
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:id",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <AuthLayout authentication>
            <Post />,
          </AuthLayout>
        ),
      },
      {
        path: "/reels",
        element: (
          <AuthLayout authentication>
            <Reels />,
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",

    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
  // </React.StrictMode>
);
