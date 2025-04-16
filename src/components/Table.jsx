import ConvertTime from '../utils/ConvertTime';

export default function Table({ type, data }) {
    const manager = ['ordinalNumber', 'fullName', 'gender', 'area', 'isPresent', 'timePresent', 'whoScan', 'imageLink'];
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
                </tbody>
            </table>
        </div>
    );
}
