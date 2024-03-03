import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import { AdminProtectedRoute } from '../RouteProtection/AdminProtectedRoute';

export const IndexPage = lazy(() => import('../pages/app'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// import IndexPage from '../pages/app';
// import UserPage from '../pages/user';
// import LoginPage from '../pages/login';
// import Page404 from '../pages/page-not-found';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <AdminProtectedRoute>
         <DashboardLayout>
            <Suspense>
             <Outlet />
            </Suspense>
          </DashboardLayout>
        </AdminProtectedRoute>
      ),
      children: [
        { path:'dashboard', element: <IndexPage />, index: true },
        { path: 'app', element: <IndexPage /> },
        { path: 'user', element: <UserPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
