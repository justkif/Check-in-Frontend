import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import GetAttribute from '../utils/GetAttribute';
import Logout from '../utils/Logout';

export default function SideBar() {
    const [menu, setMenu] = useState(false);
    const username = GetAttribute('username');
    const role = GetAttribute('role');
    const location = useLocation();
    const logout = Logout();
    const items = [
        { label: 'QR', to: `/` },
        { label: 'Change Password', to: `/password` },
        { label: 'Scanner', to: `/scanner`, role: ['scanner', 'manager', 'admin']},
        { label: 'Manager', to: `/manager`, role: ['manager', 'admin']},
        { label: 'Admin', to: `/admin`, role: 'admin'},
        { label: 'User', to: `/admin/user`, role: 'admin'}
    ];
    const visibleItems = items.filter(
        (item) => !item.role || item.role.includes(role)
    );
    const handleMenu = () => {
        setMenu(!menu);
    }
    return (
        <div>
            <HiOutlineMenu className='size-[30px]' onClick={handleMenu}/>
            {menu && (
                <div className='fixed top-0 left-0 w-64 h-full bg-white z-30 p-4 shadow-2xl'>
                    <div className='flex mb-2'>
                        <MdOutlineClose className='size-[30px]' onClick={handleMenu}/>
                        <p className='text-lg ml-4'>{role} - {username}</p>
                    </div>
                    <ul>
                        {visibleItems.map((item) => (
                            <SideBarItem
                                key={item.to}
                                to={item.to}
                                label={item.label}
                                active={location.pathname === item.to}
                                onClick={handleMenu}
                            />
                        ))}
                    </ul>
                    <button 
                        onClick={() => { handleMenu(); logout(); }} 
                        className='flex items-center py-2 px-3 font-medium text-gray-600 w-full'
                    >Logout
                    </button>
                </div>
            )}
        </div>
    );
}

function SideBarItem({ to, label, active, onClick }) {
    return (
        <li
            className={`flex items-center py-2 px-3 my-1 font-medium text-gray-600 rounded-md
                ${ active && 'bg-gradient-to-tr from-yellow-500 to-yellow-200 text-yellow-800' }
            `}
        ><Link to={to} className='w-full h-full' onClick={onClick}>{label}</Link>
        </li>
    );
}
