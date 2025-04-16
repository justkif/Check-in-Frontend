import { useState } from 'react';
import updatePassword from '../apis/updatePassword';
import Loading from '../components/Loading';
import Success from '../components/Success';
import Error from '../components/Error';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyNewPassword, setVerifyNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        try {
            if (newPassword !== verifyNewPassword) {
                throw 'Passwords dont match.';
            }
            setLoading(true);
            setSuccess(await updatePassword(password, newPassword));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 2200);
        }
    }
    return (
        <div className='flex items-center justify-center h-8/9'>
            <div className='login p-6'>
                <h2 className='text-center text-lg font-semibold'>Change Password</h2>
                <form onSubmit={handleUpdatePassword}>
                    <div className='border-b-2 border-b-black'>
                        <input 
                            type='password' 
                            value={password} 
                            onChange={(password) => setPassword(password.target.value)} 
                            className='p-2 mt-2 outline-none'
                            placeholder='Enter your old password'                         
                            required 
                        />
                    </div>
                    <div className='border-b-2 border-b-black'>
                        <input 
                            type='password' 
                            value={newPassword} 
                            onChange={(newPassword) => setNewPassword(newPassword.target.value)} 
                            className='p-2 mt-4 outline-none'
                            placeholder='Enter your new password'                           
                            required 
                        />
                    </div>
                    <div className='border-b-2 border-b-black'>
                        <input 
                            type='password' 
                            value={verifyNewPassword} 
                            onChange={(verifyNewPassword) => setVerifyNewPassword(verifyNewPassword.target.value)} 
                            className='p-2 mt-4 outline-none'
                            placeholder='Re-enter new password'                         
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
            {success && <Success success={success}/>}
            {loading && <Loading />}
        </div>
    );
}
