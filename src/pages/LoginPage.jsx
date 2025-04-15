import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../apis/loginUser';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            localStorage.setItem('token', await loginUser(username, password));
            navigate(`/`);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 2200);
        }
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='login p-6'>
                <h2 className='text-center text-lg font-semibold'>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className='border-b-2 border-b-black'>
                        <input 
                            type='text' 
                            value={username} 
                            onChange={(username) => setUsername(username.target.value)} 
                            className='p-2 mt-2 outline-none'
                            placeholder='Enter your username'                         
                            required 
                        />
                    </div>
                    <div className='border-b-2 border-b-black'>
                        <input 
                            type='password' 
                            value={password} 
                            onChange={(password) => setPassword(password.target.value)} 
                            className='p-2 mt-4 outline-none'
                            placeholder='Enter your password'                           
                            required 
                        />
                    </div>
                    <button 
                        type='submit' 
                        className='w-full py-2 bg-black text-white font-semibold rounded mt-6'
                    >Submit
                    </button>
                </form>
            </div>
            {error && <Error error={error}/>}
            {loading && <Loading />}
        </div>
    );
}
