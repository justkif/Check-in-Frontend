export default async function updateScan() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${backendUrl}/user/scan`, {
            method: 'PUT',
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
