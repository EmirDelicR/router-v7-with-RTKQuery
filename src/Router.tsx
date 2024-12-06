import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { Layout } from "@/UI/components/layout/Layout";
import { userLoader } from "@/UI/pages/HomePage";
import { itemLoader } from "@/UI/pages/work/ItemPage";
import { itemsLoader } from "@/UI/pages/work/WorkPage";
import ErrorPage from "./UI/pages/ErrorPage";

const HomePage = lazy(() => import("@/UI/pages/HomePage"));
const WorkPage = lazy(() => import("@/UI/pages/work/WorkPage"));
const ItemPage = lazy(() => import("@/UI/pages/work/ItemPage"));
const NotFoundPage = lazy(() => import("@/UI/pages/NotFoundPage"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} id="user-detail" loader={userLoader}>
      <Route index element={<HomePage />} />
      <Route path="work" errorElement={<ErrorPage />}>
        <Route index element={<WorkPage />} loader={itemsLoader} />
        <Route path=":id" element={<ItemPage />} loader={itemLoader} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const routerX = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    id: "use-detail",
    loader: userLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "work",
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <WorkPage />,
            loader: itemsLoader,
          },
          {
            path: ":id",
            element: <ItemPage />,
            loader: itemLoader,
          },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
