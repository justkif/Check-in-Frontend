import { useState, useEffect } from 'react';
import generateQR from '../apis/generateQR';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function QRPage() {
    const [src, setSrc] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        const handleGenerateQR = async () => {
            try {
                setLoading(true);
                setSrc(await generateQR());
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        handleGenerateQR();
    }, []);
    return (
        <div>
            {src && <img src={src} className='w-full'/>}
            {error && <Error error={error}/>}
            {loading && <Loading />}
        </div>
    );
}
