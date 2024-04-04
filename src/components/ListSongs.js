import React, { memo } from 'react'
import ListSong from './ListSong';
import icons from 'src/utils/icons';
import moment from 'moment';

const { BiSort, BsDot } = icons;

const ListSongs = ({ songs, totalDuration }) => {
  return (
    <div className='w-full flex flex-col text-xs text-gray-600'>
      <div className='flex justify-between items-center p-[10px] font-semibold border-b border-b-gray-400/[0.5]'>
        <div className='flex items-center gap-3 basis-1/2'>
          <span><BiSort size={16}/></span>
          <span>BÀI HÁT</span>

        </div>
        <span className='flex basis-5/12 items-center justify-start'>ALBUM</span>
        <span className='flex basis-1/12 items-center justify-end'>THỜI GIAN</span>
      </div>
      <div className='flex flex-col'>
        {songs?.map(item => <ListSong key={item.encodeId} songData={item} />)}
      </div>
      <span className='flex gap-1 items-center text-[13px] mt-4 font-semibold text-gray-500'>{songs?.length} bài hát <BsDot size={20}/> {moment.utc(totalDuration * 1000).format('h giờ m ')}phút</span>
    </div>
  )
}

export default memo(ListSongs);