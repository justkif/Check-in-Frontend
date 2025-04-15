export default function Loading() {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center'>
            <div className='border-5 border-t-5 loadingColor rounded-full w-30 h-30 animate-spin'></div>
        </div>
    );
}
