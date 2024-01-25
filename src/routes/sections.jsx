import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const PostPage = lazy(() => import('src/pages/post'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const NewPostPage = lazy(() => import('src/pages/new-post'));
export const EditPostPage = lazy(() => import('src/pages/edit-post'));
export const NewProductPage = lazy(() => import('src/pages/new-product'));
export const EditProductPage = lazy(() => import('src/pages/edit-product'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
          <Suspense>
            <Outlet />
          </Suspense>
      ),
      children: [
        { element: <LoginPage />, index: true },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
      ],
    },
    {
      path: 'post',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PostPage />, index: true },
      ],
    },
    {
      path: 'user',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <UserPage />, index: true },
      ],
    },
    {
      path: 'products',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <ProductsPage />, index: true },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'new-post',
      element: <NewPostPage />,
    },
    {
      path: 'edit-post',
      element: <EditPostPage />,
    },
    {
      path: 'new-product',
      element: <NewProductPage />,
    },
    {
      path: 'edit-product',
      element: <EditProductPage />,
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
