import moment from 'moment';
import React, { memo } from 'react';
import icons from 'src/utils/icons';
import {useDispatch} from 'react-redux';
import * as actions from 'src/store/actions';


/**
 1. React.memo():
  - React.memo() là một higher order component (HOC) được sử dụng để bọc các functional component trong React.
  - Khi bạn sử dụng React.memo(), React sẽ ghi nhớ kết quả render của component và bỏ qua các quá trình render không cần thiết, nhằm tối ưu hóa hiệu năng của quá trình render các functional component.
  - Nếu component của bạn render cùng kết quả với cùng props, React sẽ sử dụng kết quả đã render lần cuối cùng thay vì render lại component đó.
  - Ví dụ: Nếu bạn muốn chỉ cho component render lại khi giá trị props thay đổi từ số chẵn sang lẻ hoặc ngược lại, bạn có thể sử dụng React.memo().

  2. useMemo():
  - useMemo() là một hook trong React giúp ghi nhớ kết quả của một hàm.
  - Bạn có thể truyền vào hai tham số: callback và dependencies.
  - Khi gọi useMemo(), nó sẽ gọi hàm và trả về giá trị của nó.
  - Mỗi khi dependencies thay đổi, useMemo() sẽ kiểm tra và gọi lại callback để tính toán giá trị mới.

 --> React.memo() và useMemo() đều giúp cải thiện hiệu suất của ứng dụng React bằng cách cân nhắc quá trình rerender của các component123.
 */

const { PiMusicNotesSimpleLight } = icons;

const ListSong = ({ songData }) => {

  const dispatch = useDispatch();

  return (
    <div
      className='flex justify-between items-center p-[10px] border-b border-b-gray-400/[0.5] hover:bg-[#DDE4E4] cursor-pointer'
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
      }}
     >
      <div className='flex items-center gap-3 basis-1/2'>
        <span><PiMusicNotesSimpleLight size={16}/></span>
        <img src={songData?.thumbnailM} alt='thumbnailM' className='w-10 h-10 object-cover rounded-md'/>
        <span className='flex flex-col truncate'>
          <span className='text-sm font-semibold text-ellipsis overflow-hidden'>{songData?.title}</span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
      <div className='basis-5/12 flex items-center justify-start text-ellipsis overflow-hidden'>
        {songData?.album?.title}
      </div>
      <div className='basis-1/12 flex items-center justify-end'>
        {moment.utc(songData?.duration * 1000).format('mm:ss')}
      </div>
    </div>
  )
}

export default memo(ListSong)