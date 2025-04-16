export default async function scanQR(runnerId) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${backendUrl}/runner/scanQR`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ runnerId })
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json(); 
    } catch (err) {
        throw err.message;
    }
}
