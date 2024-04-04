import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Player, SidebarLeft, SidebarRight } from 'src/components';


const Public = () => {
    return (
        <div className='w-full relative h-screen flex flex-col bg-main-300'>
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] h-full flex-none'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto border border-red-500'>
                    <div className='h-[70px] px-[59px] flex items-center mb-5'>
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className='w-[329px] hidden 1600:flex flex-none animate-slide-left'>
                    <SidebarRight />
                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 h-[90px]'>
                <Player/>
            </div>
        </div>
    )
}

export default Public;