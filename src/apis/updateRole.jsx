export default async function updateRole(username, role) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${backendUrl}/user/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': `${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ username, role })
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json();
    } catch (err) {
        throw err.message;
    }
}
