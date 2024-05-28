import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as apis from '../apis';
import icons from 'src/utils/icons';
import * as actions from 'src/store/actions';
import moment from 'moment';
import { toast } from 'react-toastify';

const { AiFillHeart, AiOutlineHeart, TbDots, MdSkipNext, MdSkipPrevious, CiRepeat, CiShuffle, BsFillPlayFill, BsFillPauseFill } = icons;

const Player = () => {

    const { curSongId, isPlaying, songs } = useSelector(state => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [audio, setAudio] = useState(new Audio());
    const [timeCounting, setTimeCounting] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [curSongIndex, setCurSongIndex] = useState(0);
    const dispatch = useDispatch();
    const thumbRef = useRef();
    const trackRef = useRef();
    const prevRef = useRef();

    useEffect(() => {
        songs?.forEach((item, index) => {
            if(item.encodeId === curSongId) setCurSongIndex(index);
        });
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId),
            ]);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
            }
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
                audio.currentTime = 0;
                setTimeCounting(0);
            }else{
                audio.pause();
                setAudio(new Audio());
                dispatch(actions.play(false));
                toast.warning(res2.data.msg);
                audio.currentTime = 0;
                setTimeCounting(0);
                thumbRef.current.style.cssText = 'right: 100%';
            }
        };
        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        audio.load();
        if (isPlaying) {
            audio.play()
        };
    }, [audio]);

    useEffect(() => {
        let intervalId;
        if (isPlaying) {
          intervalId = setInterval(() => {
            let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100;
            setTimeCounting(Math.round(audio.currentTime));
            thumbRef.current.style.cssText = `right: ${100 - percent}%`;
          }, 200);
        }else{
            intervalId && clearInterval(intervalId);
        }
        return () => {
          // Dừng interval khi component unmount hoặc khi isPlaying thay đổi
          clearInterval(intervalId);
        };
      }, [audio, isPlaying]);

    const handleToggleMusic = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.play(false));
        } else {
            audio.play();
            dispatch(actions.play(true));
        }
    }

    const handleProgressBar = (e) =>{
        const trackRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = percent * songInfo.duration / 100;
        setTimeCounting(Math.round(percent * songInfo.duration / 100));
    }

    const handlePrevSong = () =>{
        if(songs){
            curSongIndex === 0 ?  dispatch(actions.setCurSongId(songs[0].encodeId)) : dispatch(actions.setCurSongId(songs[curSongIndex - 1].encodeId));
            dispatch(actions.play(true));
        }
    }

    const handleNextSong = () =>{
        if(songs){
            curSongIndex === songs.length - 1 ? dispatch(actions.setCurSongId(songs[0].encodeId)) : dispatch(actions.setCurSongId(songs[curSongIndex + 1].encodeId));
            dispatch(actions.play(true));
        }
    }

    const handleShuffle = () =>{

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
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <TbDots size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto flex flex-col items-center justify-center gap-2 py-2'>
                <div className='flex gap-8 justify-center items-center'>
                    <span className={`cursor-pointer hover:text-main-500 ${isShuffle && 'text-purple-600'}`} title='Bật phát ngẫu nhiên' onClick={() => setIsShuffle(prev => !prev)}><CiShuffle size={24} /></span>
                    <span 
                        ref={prevRef} 
                        className={`${songs && curSongIndex !== 0 ? 'cursor-pointer hover:text-main-500' : 'text-gray-500 cursor-not-allowed'}`}
                        onClick={handlePrevSong}>
                        <MdSkipPrevious size={24} />
                    </span>
                    <span
                        className='p-1 border border-gray-700 hover:text-main-500 rounded-full cursor-pointer'
                        onClick={handleToggleMusic}
                    >
                        {isPlaying ? <BsFillPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                    </span>
                    <span className={`${songs ? 'cursor-pointer hover:text-main-500' : 'text-gray-500'}`} onClick={handleNextSong}><MdSkipNext size={24} /></span>
                    <span className='cursor-pointer hover:text-main-500' title='Bật phát tất cả'><CiRepeat size={24} /></span>
                </div>
                <div className='w-full flex justify-around items-center gap-3 cursor-pointer'>
                    <span className='text-[12px] text-[#93a2a6] font-semibold'>{moment.utc(timeCounting * 1000).format('mm:ss')}</span>
                    <div 
                    ref={trackRef}
                    className='w-full relative m-auto h-[3px] hover:h-2 rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.1)]'
                    onClick={handleProgressBar}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080]'></div>
                    </div>
                    <span className='text-[12px] text-[#535860] font-semibold'>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-red-500'>Volume</div>
        </div>
    )
}

export default Player