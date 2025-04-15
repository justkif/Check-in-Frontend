import { jwtDecode } from 'jwt-decode';

export default function VerifyToken() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const decoded = jwtDecode(token);
        return decoded.exp && decoded.exp > Date.now() / 1000;
    } catch (err) {
        return false;
    }
}
