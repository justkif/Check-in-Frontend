import { useEffect, useState } from 'react';
import getScan from '../apis/getScan';
import updateScan from '../apis/updateScan';
import reset from '../apis/reset';
import Loading from '../components/Loading';
import Success from '../components/Success';

export default function AdminPage() {
    const [scan, setScan] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const handleGetScan = async () => {
        try {
            setLoading(true);
            const response = await getScan();
            setScan(response.isScan);
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }
    const handleUpdateScan = async () => {
        try {
            setLoading(true);
            await updateScan();
            await handleGetScan();
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }
    const handleReset = async () => {
        try {
            setLoading(true);
            setSuccess('');
            setSuccess(await reset());
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        handleGetScan();
    } ,[]);
    return ( 
        <ul className='text-white text-lg flex flex-col items-center'>
            <li className='bg-gray-700 rounded p-2 mt-2 flex items-center w-3/4'>
                <span className='ml-4'>Scan</span>
                <button 
                    className={`px-5 py-2 rounded ml-auto
                        ${scan ? 'bg-green-500' : 'bg-red-500'}
                        ${loading ? 'cursor-not-allowed' : ''}
                    `}
                    onClick={handleUpdateScan}
                >{scan ? 'ON' : 'OFF'}
                </button>
            </li>
            <li className='bg-gray-700 rounded p-2 mt-2 flex items-center w-3/4'>
                <span className='ml-4'>Reset</span>
                <button 
                    className={`px-5 py-2 rounded ml-auto bg-blue-500
                        ${loading ? 'cursor-not-allowed' : ''}
                    `}
                    onClick={handleReset}
                >Reset
                </button>
            </li>
            {loading && <Loading/>}
            {success && <Success success={success} />}
        </ul>
    );
}
