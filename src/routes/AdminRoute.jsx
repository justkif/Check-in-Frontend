import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';

export default function AdminRoute() {
    return (
        <div className='h-screen'>
            <Routes>
                <Route index element={<AdminPage />} />
                <Route path='user' element={<UserPage />} />
                <Route path='*' element={<Navigate to='/admin' replace />} />
            </Routes>
            <Outlet />
        </div>
    );
}
