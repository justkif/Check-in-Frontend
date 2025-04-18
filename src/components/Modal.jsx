import { useState } from 'react';

export default function Modal({ data, type, cancel, confirm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [arg, setArg] = useState(() => {
        if (type === 'updateRole') {
            return 'runner';
        }
        return '';
    });
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.7)]'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg font-bold w-11/12'>
                {type === 'confirm' && (
                    <p className='whitespace-pre-wrap text-left'>{data}</p>
                )}
                {type === 'updatePasswordAdmin' && (
                    <input
                        type='text'
                        value={arg}
                        onChange={(arg) => setArg(arg.target.value)}
                        className='w-full border px-3 py-2 rounded'
                        placeholder={`Enter a new password for ${data.username}`}
                        required
                    />
                )}
                {type === 'updateRole' && (
                    <select 
                        className='w-full border px-3 py-2 rounded'   
                        value={arg}
                        onChange={(e) => setArg(e.target.value)}
                    >
                        <option value='runner'>runner</option>
                        <option value='scanner'>scanner</option>
                        <option value='manager'>manager</option>
                    </select>
                )}
                {type === 'registerUser' && (
                    <div>
                        <input
                            type='text'
                            value={username}
                            onChange={(username) => setUsername(username.target.value)}
                            className='w-full border px-3 py-2 rounded'
                            placeholder='Enter a username'
                            required
                        />
                        <input
                            type='text'
                            value={password}
                            onChange={(password) => setPassword(password.target.value)}
                            className='w-full border px-3 py-2 rounded mt-2'
                            placeholder='Enter a password'
                            required
                        />
                    </div>
                )}
                <div className='flex items-center'>
                    <button
                        className='px-4 py-2 bg-red-500 text-white rounded mt-4 mx-auto w-auto mr-10'
                        onClick={cancel}
                    >Cancel
                    </button>
                    <button
                        className='px-4 py-2 bg-green-500 text-white rounded mt-4 mx-auto w-auto'
                        onClick={() => {
                            if (type === 'registerUser') {
                                confirm(username, password);
                            } else {
                                confirm(arg);
                            }
                        }}
                    >Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
