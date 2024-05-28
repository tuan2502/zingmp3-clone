import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '../../apis';
import moment from 'moment';
import { ListSongs } from 'src/components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const Album = () => {

    const { pid } = useParams();
    const [playlistData, setPlaylistData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const res = await apis.apiGetDetailPlaylist(pid);
            if(res.data?.err === 0){
                setPlaylistData(res.data?.data);
                dispatch(actions.setPlaylist(res?.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist();
    }, [pid])


    return (
        <Scrollbars style={{ width: '100%', height: '80%' }}>
            <div className='flex gap-8 w-full p-[59px] mb-40'>
                <div className='flex-none w-1/4 flex flex-col items-center gap-1'>
                    <img src={playlistData?.thumbnailM} alt='thumbnail' className='w-full object-contain rounded-md shadow-md'/>
                    <div className='flex flex-col items-center gap-1'>
                        <h3 className='text-[20px] font-bold text-gray-800'>{playlistData?.title}</h3>
                        <span className='flex gap-2 items-center text-gray-500 text-xs'>
                            <span>Cập nhật</span>
                            <span>
                                {moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}
                            </span>
                        </span>
                        <span className='flex gap-2 items-center text-gray-500 text-xs' >{playlistData?.artistsNames}</span>
                        <span className='flex gap-2 items-center text-gray-500 text-xs' >{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
                    </div>
                </div>
                <div className='flex-auto'>
                    <span className='text-sm'>
                        <span className='text-gray-600'>Lời tựa </span>
                        <span>{playlistData?.sortDescription}</span>
                    </span>
                    <ListSongs totalDuration={playlistData?.song?.totalDuration}/>
                </div>
            </div>
        </Scrollbars>
    )
}

export default Album;