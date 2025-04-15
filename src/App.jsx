import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthenticationRoute from './routes/AuthenticationRoute';
import LoginPage from './pages/LoginPage';
import MainRoute from './routes/MainRoute';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className='h-screen px-4 py-4 overflow-hidden'>
        <Routes>
          <Route
            path='/login'
            element={
              <AuthenticationRoute>
                <LoginPage />
              </AuthenticationRoute>
            }
          />
          <Route
            path='/*'
            element={
              <AuthenticationRoute>
                <MainRoute />
              </AuthenticationRoute >
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </Router>
  );
}
