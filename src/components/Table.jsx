import ConvertTime from '../utils/ConvertTime';

export default function Table({ type, data, function1, function2 }) {
    const manager = ['ordinalNumber', 'fullName', 'gender', 'area', 'isPresent', 'timePresent', 'whoScan', 'imageLink'];
    const userHeaders = ['username', 'role', 'actions'];
    return (
        <div className='overflow-auto max-h-[80vh] shadow-2xl'>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='font shadow-lg'>
                        {type === 'manager' && 
                            manager.map((header) => (
                                <th key={header} className='px-4 py-4 text-left'>{header}</th>
                            ))
                        }
                        {type === 'user' && 
                            userHeaders.map((header) => (
                                <th key={header} className='px-4 py-4 text-left'>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {type === 'manager' && (
                        data.map((runner) => (
                            <tr key={runner.ordinalNumber} className='even:bg-gray-100'>
                                {manager.map((header) => (
                                    <td key={header} className={`px-4 py-4 
                                            ${header === 'ordinalNumber' ? 'text-blue-500 underline decoration-blue-500' : ''}
                                        `}>
                                            {header === 'isPresent' ? (
                                                runner.isPresent ? 'Yes' : 'No'
                                            ) : header === 'timePresent' ? (
                                                ConvertTime(runner.timePresent)
                                            ) : (
                                                runner[header]
                                            )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                    {type === 'user' && (
                        data.map((user) => (
                            <tr key={user.username} className='even:bg-gray-100'>
                                {userHeaders.map((header) => (
                                    <td key={header} className='px-4 py-4'>
                                        {header === 'actions' ? (
                                            <div className='flex space-x-10 text-white'>
                                                <button
                                                    className='px-4 py-2 bg-blue-500 rounded'
                                                    onClick={() => function1(user)}
                                                >Change Password
                                                </button>
                                                <button
                                                    className='px-4 py-2 bg-blue-500 rounded'
                                                    onClick={() => function2(user)}
                                                >Change Role
                                                </button>
                                            </div>
                                        ) : (
                                            user[header]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
