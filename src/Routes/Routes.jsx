import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../assets/ErrorPage";
import ToDoList from "../assets/ToDoList";
import AddItem from "../assets/AddItem";


function Routes() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <ToDoList />,
            errorElement: <ErrorPage />
          },
          {
            path: "/add-item",
            element: <AddItem />
          }
        ]);
        

    return <RouterProvider router = {router} />
}

export default Routes;