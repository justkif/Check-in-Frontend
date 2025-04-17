export default async function reset() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${backendUrl}/runner/reset`, {
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
