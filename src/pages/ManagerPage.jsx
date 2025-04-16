import { useEffect, useState } from 'react';
import exportExcel from '../apis/exportExcel'
import runnerGetAll from '../apis/runnerGetAll';
import Table from '../components/Table';
import Loading from '../components/Loading';

export default function ManagerPage() {
    const [runners, setRunners] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getAll = async () => {
            try {
                setLoading(true);
                setRunners(await runnerGetAll());
            } catch (err) {
            } finally {
                setLoading(false);
            }
        }
        getAll();
    }, []);
    return (
        <div>
            <button className='px-4 py-2 rounded bgColor text-white font-semibold my-4' onClick={exportExcel}>Export Excel</button>
            <Table type={'manager'} data={runners}/>
            {loading && <Loading />}
        </div>
    );
}
