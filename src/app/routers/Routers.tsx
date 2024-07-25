import Loading from '@shared/loading';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';

const Ripple1Page = lazy(() => import('@pages/ripple1'));
const Ripple2Page = lazy(() => import('@pages/ripple2'));

export default function Router() {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <Outlet />,
            children: [
                {
                    path: '/1',
                    element: <Ripple1Page />
                },
                {
                    path: '/2',
                    element: <Ripple2Page />
                }
            ]
        }
    ];

    const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}
