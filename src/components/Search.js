import React from 'react'
import icons from 'src/utils/icons';


const { GoSearch } = icons;

const Search = () => {
    return (
        <div className='w-full bg-[#DDE4E4] px-4 py-2 rounded-[20px] h-10 flex items-center text-gray-500'>
            <span><GoSearch size={24}/></span>
            <input type='text' className='w-full outline-none bg-[#DDE4E4] px-4 py-2 h-10' placeholder='Tìm bài hát, nghệ sĩ, lời bài hát...' />
        </div>
    )
}

export default Search;