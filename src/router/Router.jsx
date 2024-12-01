import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Home from "../components/Home";
import AddUser from "../components/AddUser";
import UpdateUser from "../components/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://user-management-server-nine-psi.vercel.app/users"),
      },
      {
        path: "/addUser",
        element: <AddUser></AddUser>,
      },
      {
        path: "/updateUser/:id",
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) =>
          fetch(
            `https://user-management-server-nine-psi.vercel.app/users/${params.id}`
          ),
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
