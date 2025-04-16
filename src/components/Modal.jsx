export default function Modal({ data, type, cancel, confirm }) {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.7)]'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg font-bold w-11/12'>
            {type === 'confirm' && (
                <div>
                    <p className='whitespace-pre-wrap text-left'>{data}</p>
                    <div className='flex items-center'>
                        <button
                            className='px-4 py-2 bg-red-500 text-white rounded mt-4 mx-auto w-auto mr-10'
                            onClick={cancel}
                        >Cancel
                        </button>
                        <button
                            className='px-4 py-2 bg-green-500 text-white rounded mt-4 mx-auto w-auto'
                            onClick={confirm}
                        >Confirm
                        </button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
