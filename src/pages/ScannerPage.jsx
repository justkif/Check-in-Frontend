import { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import getOne from '../apis/getOne';
import scanQR from '../apis/scanQR';
import getScanned from '../apis/getScanned';
import ConvertTime from '../utils/ConvertTime';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import Success from '../components/Success';
import Error from '../components/Error';

export default function ScannerPage() {
    const [view, setView] = useState('scanner');
    const scannerRef = useRef(null);
    const isScanning = useRef(false);
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState('');
    const runnerIdRef = useRef(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [scanned, setScanned] = useState([]);
    const handleView = () => {
        if (view === 'scanner') {
            setView('history');
        } else {
            setView('scanner');
        }
    }
    const qrCodeSuccessCallback = async (runnerId) => {
        try {
            if (isScanning.current) {
                await stopScan();
                setLoading(true);
                const response = await getOne(runnerId);
                const { imageLink, ordinalNumber, fullName, gender, area, isPresent, timePresent, whoScan } = response;
                setConfirm([
                    `ordinalNumber: ${ordinalNumber}`,
                    `fullName: ${fullName}`,
                    `gender: ${gender}`,
                    `area: ${area}`,
                    `isPresent: ${isPresent}`,
                    `timePresent: ${ConvertTime(timePresent)}`,
                    `whoScan: ${whoScan}`,
                    `imageLink: ${imageLink}`
                ].join('\n'));
                runnerIdRef.current = runnerId;
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }
    const qrCodeErrorCallback = () => {
    }
    const startScan = () => {
        if (!scannerRef.current) {
            const html5QrcodeScanner = new Html5Qrcode('reader');
            html5QrcodeScanner.start(
                { facingMode: 'environment' },
                {
                    fps: 5,
                    qrbox: 240
                },
                qrCodeSuccessCallback,
                qrCodeErrorCallback
            );
            scannerRef.current = html5QrcodeScanner;
            isScanning.current = true;
        }
    }
    const stopScan = async () => {
        try {
            if (scannerRef.current && isScanning.current) {
                await scannerRef.current.stop();
                await scannerRef.current.clear();
                scannerRef.current = null;
                isScanning.current = false;
            }
        } catch (err) {
        }
    }
    const handleCancel = () => {
        setConfirm('');
        startScan();
    }
    const handleConfirm = async () => {
        try {
            setLoading(true);
            setConfirm('');
            setError('');
            setSuccess(await scanQR(runnerIdRef.current));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            startScan();
        }
    }
    const handleHistory = async () => {
        try {
            setLoading(true);
            const response = await getScanned();
            const data = await Promise.all(response.scanned.map(id => getOne(id)));
            setScanned(data);
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (view === 'scanner') {
            startScan();
        } else {
            stopScan();
            handleHistory();
        }
        return () => {
            stopScan();
        }
    }, [view]);
    return (
        <div className='overflow-auto h-screen'>
            <div className='flex justify-center mt-5'>
                <div className='relative text-white bg-black p-1 rounded font-semibold'>
                    <div
                        className={`absolute bgColor top-1 bottom-1 transition-all duration-200 rounded
                            ${view === 'scanner' ? 'left-1' : 'left-1/2'}
                        `}
                        style={{ width: 'calc(50% - 0.25rem)' }}
                    ></div>
                    <button className='relative px-10 py-2 rounded w-1/2' onClick={handleView}>Scanner</button>
                    <button className='relative px-10 py-2 rounded w-1/2' onClick={handleView}>History</button>
                </div>
            </div>
            {view === 'history' && (
                <div className="mt-4 overflow-y-auto max-h-[80vh] px-2">
                    <ul className='flex flex-col items-center text-white text-lg'>
                        {scanned.map((runner) => (
                            <HistoryItem scanned={runner} key={runner.ordinalNumber} />
                        ))}
                    </ul>
                </div>
            )}
            {view === 'scanner' && <div id='reader' className='w-full mt-10'></div>}
            {confirm && <Modal data={confirm} type={'confirm'} cancel={handleCancel} confirm={handleConfirm}/>}
            {error && <Error error={error}/>}
            {success && <Success success={`${success.fullName} is present.`}/>}
            {loading && <Loading/>}
        </div>
    );
}

function HistoryItem({ scanned }) {
    return (
        <li className='bg-gray-700 w-5/6 rounded p-2 mt-2'>
            <div>
                {scanned.ordinalNumber} - {scanned.fullName}
            </div>
            <div>
                {scanned.gender} - {scanned.area}
            </div>
            <div className='text-right text-base'>
                {ConvertTime(scanned.timePresent)}
            </div>
        </li>
    );
}
