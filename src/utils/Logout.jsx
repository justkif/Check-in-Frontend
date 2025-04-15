import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    return () => {
        localStorage.removeItem('token');
        navigate(`/login`);
    }
}
