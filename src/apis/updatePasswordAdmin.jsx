export default async function updatePasswordAdmin(username, newPassword) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${backendUrl}/user/passwordAdmin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': `${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ username, newPassword })
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json();
    } catch (err) {
        throw err.message;
    }
}
