import GetAttribute from '../utils/GetAttribute';

export default async function updatePassword(password, newPassword) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const username = GetAttribute('username');
    try {
        const response = await fetch(`${backendUrl}/user/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': `${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ username, password, newPassword })
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json(); 
    } catch (err) {
        throw err.message;
    }
}
