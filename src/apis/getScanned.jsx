import GetAttribute from '../utils/GetAttribute';

export default async function getScanned() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const id = GetAttribute('id');
        const response = await fetch(`${backendUrl}/user/scanned/${id}`, {
            headers: { 'token': `${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json(); 
    } catch (err) {
        throw err.message;
    }
}
