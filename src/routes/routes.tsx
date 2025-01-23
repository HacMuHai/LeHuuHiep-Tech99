import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Exercise1Page } from "../pages";
import Root from "../pages/Root";
import { path } from "./path";
import Exercise2Page from "../pages/exercise/Exercise2Page";
import Exercise3Page from "../pages/exercise/Exercise3Page";
import Exercise4Page from "../pages/exercise/Exercise4Page";
import Exercise5Page from "../pages/exercise/Exercise5Page";
import Exercise6Page from "../pages/exercise/Exercise6Page";

const Router = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      // element: <Exercise1Page />,
      element: <Root />,
      children: [
        { path: path.EXERCISE1, element: <Exercise1Page /> },
        { path: path.EXERCISE2, element: <Exercise2Page /> },
        { path: path.EXERCISE3, element: <Exercise3Page /> },
        { path: path.EXERCISE4, element: <Exercise4Page /> },
        { path: path.EXERCISE5, element: <Exercise5Page /> },
        { path: path.EXERCISE6, element: <Exercise6Page /> },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
