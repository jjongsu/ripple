import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Ripple1Page = lazy(() => import('@pages/ripple1'));
const Ripple2Page = lazy(() => import('@pages/ripple2'));

export default function Router() {
    return (
        <BrowserRouter basename='/ripple'>
            <Routes>
                <Route path='/1' element={<Ripple1Page />} />
                <Route path='/2' element={<Ripple2Page />} />

                <Route path='/*' element={<div className='bg-black'>메인</div>} />
            </Routes>
        </BrowserRouter>
    );
}
