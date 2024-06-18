import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../assets/ErrorPage";
import ToDoList from "../assets/ToDoList";
import AddItem from "../assets/AddItem";
import EditItem from "../assets/EditItem";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ToDoList />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/add-item",
      element: <AddItem />,
    },
    {
      path: "/edit-item/:id",
      element: <EditItem />,
      loader: ({ params }) => {
        return { params };
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
