import { useLocation, Navigate } from 'react-router-dom';
import VerifyToken from '../utils/VerifyToken';

export default function AuthenticationRoute({ children }) {
    const isLoginPage = useLocation().pathname === `/login`;
    const isLoggedIn = VerifyToken();
    if (isLoginPage && isLoggedIn) {
        return <Navigate to='/' replace />;
    } else if (!isLoginPage && !isLoggedIn) {
        return <Navigate to='/login' replace />;
    }
    return children;
}
