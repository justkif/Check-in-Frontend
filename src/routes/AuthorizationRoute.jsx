import { Navigate } from 'react-router-dom';
import GetAttribute from '../utils/GetAttribute';

export default function AuthorizationRoute({ role, children }) {
    const currentRole = GetAttribute('role');
    if (!role.includes(currentRole)) {
        return <Navigate to='/' replace />;
    }
    return children;
}
