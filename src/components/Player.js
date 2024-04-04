import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as apis from '../apis';
import icons from 'src/utils/icons';
import * as actions from 'src/store/actions';


const { AiFillHeart, AiOutlineHeart, TbDots, MdSkipNext, MdSkipPrevious, CiRepeat, CiShuffle, BsFillPlayFill, BsFillPauseFill } = icons;

const Player = () => {

    const audioEl = useRef(new Audio());
    const { curSongId, isPlaying } = useSelector(state => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [source, setSource] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
      const fetchDetailSong = async () =>{
        const [res1, res2] = await Promise.all([
            apis.apiGetDetailSong(curSongId),
            apis.apiGetSong(curSongId),
        ]); 
        if(res1.data.err === 0){
            setSongInfo(res1.data.data);
        }
        if(res2.data.err === 0){
            setSource(res2.data.data['128']);
        }
      };
      fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        audioEl.current.pause();
        audioEl.current.src = source;
        audioEl.current.load();
        if(isPlaying) audioEl.current.play();
    }, [curSongId, source, isPlaying])


    const handleToggleMusic = () =>{
        if(isPlaying){
            audioEl.current.pause();
            dispatch(actions.play(false));
        }else{
            audioEl.current.play();
            dispatch(actions.play(true));
        }
    }


    return (
        <div className='h-full bg-main-400 px-5 flex'>
            <div className='w-[30%] flex-auto flex gap-3 items-center'>
                <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span>
                        <AiOutlineHeart size={16}/>
                    </span>
                    <span>
                        <TbDots size={16}/>
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto border flex flex-col items-center justify-center gap-2 border-red-500 py-2'>
                <div className='flex gap-8 justify-center items-center'>
                    <span className='cursor-pointer' title='Bật phát ngẫu nhiên'><CiShuffle size={24} /></span>
                    <span className='cursor-pointer' ><MdSkipPrevious size={24} /></span>
                    <span 
                    className='p-1 border border-gray-700 hover:text-main-500 rounded-full cursor-pointer'
                    onClick={handleToggleMusic}
                    >
                        {isPlaying ? <BsFillPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                    </span>
                    <span className='cursor-pointer'><MdSkipNext size={24} /></span>
                    <span className='cursor-pointer' title='Bật phát tất cả'><CiRepeat size={24} /></span>
                </div>
                <div>
                    progress bar
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-red-500'>Volume</div>
        </div>
    )
}

export default Player