import { lazy } from 'react';
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';

const Ripple1Page = lazy(() => import('@pages/ripple1'));
const Ripple2Page = lazy(() => import('@pages/ripple2'));

export default function Router() {
    const routes: RouteObject[] = [
        {
            path: '/ripple/',
            element: (
                <div className='bg-black'>
                    메인
                    <Outlet />
                </div>
            ),
            children: [
                {
                    path: '/ripple/1',
                    element: <Ripple1Page />
                },
                {
                    path: '/ripple/2',
                    element: <Ripple2Page />
                }
            ]
        }
    ];

    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
    // return (
    //     <BrowserRouter basename={'/ripple/'}>
    //         <Routes>
    //             <Route path='/1' element={<Ripple1Page />} />
    //             <Route path='/2' element={<Ripple2Page />} />

    //             <Route path='*' element={<div className='bg-black'>메인</div>} />
    //         </Routes>
    //     </BrowserRouter>
    // );
}
