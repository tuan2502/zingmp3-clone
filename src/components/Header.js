import React from 'react'
import icons from 'src/utils/icons';
import { Search } from 'src/components';


const { GoArrowLeft, GoArrowRight } = icons;

const Header = () => {
  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex gap-6 items-center w-full'>
        <div className='flex gap-4 text-gray-400'>
          <span><GoArrowLeft size={24} /></span>
          <span><GoArrowRight size={24} /></span>
        </div>
        <div className='w-1/2'>
          <Search />
        </div>
      </div>
      <div>
        đăng nhập
      </div>
    </div>
  )
}


export default Header;