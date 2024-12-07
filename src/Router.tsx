import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import { Layout } from '@/UI/components/layout/Layout';
import { userLoader } from '@/UI/pages/HomePage';

const ErrorPage = lazy(() => import('@/UI/pages/ErrorPage'));
const HomePage = lazy(() => import('@/UI/pages/HomePage'));
const WorkPage = lazy(() => import('@/UI/pages/work/WorkPage'));
const ItemPage = lazy(() => import('@/UI/pages/work/ItemPage'));
const NotFoundPage = lazy(() => import('@/UI/pages/NotFoundPage'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} id="user-detail" loader={userLoader}>
      <Route index element={<HomePage />} />
      <Route path="work" errorElement={<ErrorPage />}>
        <Route
          index
          element={<WorkPage />}
          loader={(meta) =>
            import('@/UI/pages/work/WorkPage').then((module) =>
              module.itemsLoader(meta)
            )
          }
        />
        <Route
          path=":id"
          element={<ItemPage />}
          loader={(meta) =>
            import('@/UI/pages/work/ItemPage').then((module) =>
              module.itemLoader(meta)
            )
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
