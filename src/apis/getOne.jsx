export default async function getOne(runnerId) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${backendUrl}/runner/${runnerId}`, {
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
