import { jwtDecode } from 'jwt-decode';

export default function GetAttribute(attribute) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        const decoded = jwtDecode(token);
        if (attribute === 'role') {
            return decoded.role;
        } else if (attribute == 'username') {
            return decoded.username;
        } else if (attribute == 'id') {
            return decoded.id;
        }
        return null;
    } catch (err) {
        return null;
    }
}
