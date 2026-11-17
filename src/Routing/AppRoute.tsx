
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import TV from "../pages/TV/TV";
import NotFound from "../pages/Not-Found/NotFound";
import CardDetails from "../pages/CardDetails/CardDetails";
import Favorites from "../pages/Favorites/Favorites";
import Login from "../pages/LoginPage/Login";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movie/:id",
        element: <CardDetails />,
      },
      {
        path: "tv/:id",
        element: <CardDetails />,
      },
      {
        path: "tvShows",
        element: <TV />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
