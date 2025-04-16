export default async function exportExcel() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${backendUrl}/runner/export/excel`, {
            headers: { 'token': `${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
            throw new Error(await response.json());
        }
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Runner.xlsx';
        link.click();
        URL.revokeObjectURL(link.href);
    } catch (err) {
        throw err.message;
    }
}
