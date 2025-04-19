import { useEffect, useState } from 'react';
import userGetAll from '../apis/userGetAll';
import updatePasswordAdmin from '../apis/updatePasswordAdmin';
import updateRole from '../apis/updateRole';
import registerUser from '../apis/registerUser';
import Table from '../components/Table';
import Loading from '../components/Loading';
import Success from '../components/Success';
import Error from '../components/Error';
import Modal from '../components/Modal';

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(null);
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const getAll = async () => {
        try {
            setLoading(true);
            setUsers(await userGetAll());
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }
    const handleCancel = () => {
        setType('');
        setUser('');
    }
    const handleConfirm = async (arg1, arg2) => {
        try {
            setType('');
            setLoading(true);
            setSuccess('');
            setError('');
            if (type === 'updatePasswordAdmin') {
                const response = await updatePasswordAdmin(user.username, arg1); 
                setSuccess(`${response.username} password has changed.`)
            } else if (type === 'updateRole') {
                const response = await updateRole(user.username, arg1); 
                setSuccess(`${response.username} has become ${response.role}.`);
                getAll();         
            } else if (type === 'registerUser') {
                const response = await registerUser(arg1, arg2);
                setSuccess(`${response.username} has been created.`);
                getAll();
            }   
        } catch (err) {
            setError(err);
        } finally {
            setUser('');
            setLoading(false);
        }
    }
    useEffect(() => {
        getAll();
    }, []);
    return (
        <div>
            <button className='px-4 py-2 rounded bgColor text-white font-semibold my-4' onClick={() => setType('registerUser')}>Create User</button>
            <Table 
                type={'user'} 
                data={users} 
                function1={(user) => { setType('updatePasswordAdmin'); setUser(user); }} 
                function2={(user) => { setType('updateRole'); setUser(user);    }}
            />
            {type && 
                <Modal 
                    key={type} 
                    type={type} 
                    data={user} 
                    cancel={handleCancel} 
                    confirm={(arg1, arg2) => {
                        if (type === 'registerUser') {
                          handleConfirm(arg1, arg2);
                        } else {
                          handleConfirm(arg1);
                        }
                      }}
                />
            }
            {loading && <Loading />}
            {success && <Success success={success} />}
            {error && <Error error={error} />}
        </div>
    );
}
