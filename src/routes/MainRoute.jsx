import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import QRPage from '../pages/QRPage';
import UpdatePasswordPage from '../pages/UpdatePasswordPage';
import AuthorizationRoute from '../routes/AuthorizationRoute';
import ScannerPage from '../pages/ScannerPage';
import ManagerPage from '../pages/ManagerPage';
import AdminRoute from '../routes/AdminRoute';

export default function MainRoute() {
  return (
    <div className='h-screen'>
      <SideBar />
      <Routes>
        <Route index element={<QRPage />} />
        <Route path='password' element={<UpdatePasswordPage />} />
        <Route 
          path='scanner' 
          element={
            <AuthorizationRoute role={['scanner', 'manager', 'admin']}>
              <ScannerPage />
            </AuthorizationRoute>
          } 
        />
        <Route 
          path='manager' 
          element={
            <AuthorizationRoute role={['manager', 'admin']}>
              <ManagerPage />
            </AuthorizationRoute>
          } 
        />
        <Route 
          path='admin/*' 
          element={
            <AuthorizationRoute role={['admin']}>
              <AdminRoute />
            </AuthorizationRoute>
          } 
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Outlet />
    </div>
  );
}
