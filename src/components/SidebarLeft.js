import React from 'react';
import logo from 'src/assets/img/logo-light.svg';
import { sidebarMenu } from 'src/utils/menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import path from 'src/utils/path';



const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center';
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center';

const SidebarLeft = () => {

    const navigate = useNavigate();
    return (
        <div className='h-full flex flex-col bg-main-200'>
            <div onClick={() => navigate(path.HOME)} className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center'>
                <img src={logo} alt='logo' className='w-[120px] h-10' />
            </div>
            <div>
                {
                    sidebarMenu.map(item => (
                        <NavLink to={item.path} key={item.path} end={item.end} className={({ isActive }) => isActive ? activeStyle : notActiveStyle} >
                            {item.icon}<span>{item.text}</span>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default SidebarLeft