import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArrSlider } from 'src/utils/fn';
import * as actions from '../store/actions';
import {useNavigate } from 'react-router-dom';

const Slider = () => {
    const { banner } = useSelector(state => state.app); 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //animation for banner

    useEffect(() => {
        // Tạo slider
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0;
        let max = 2;
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1)
                        
            for (let i = 0; i < sliderEls.length; i++) {
                // Xoa classnames(css)
                sliderEls[i].classList?.remove('anime-slide-right', 'order-last', 'z-20');
                sliderEls[i].classList?.remove('anime-slide-left', 'order-first', 'z-10');
                sliderEls[i].classList?.remove('anime-slide-left-2', 'order-2', 'z-10');

                if (list.some(item => item === i)) {
                    sliderEls[i].style.cssText = 'display: block';
                } else {
                    sliderEls[i].style.cssText = 'display: none';
                }
            }
            // Them animation
            list.forEach(item => {
                if (item === max) {
                    sliderEls[item].classList?.add('animate-slide-right', 'order-last', 'z-20');
                } else if(item === min) {
                    sliderEls[item].classList?.add('animate-slide-left', 'order-first', 'z-10');
                } else{
                    sliderEls[item].classList?.add('animate-slide-left-2', 'order-2', 'z-10');
                }
            });

            min = (min === sliderEls.length - 1) ? 0 : min + 1;
            max = (max === sliderEls.length - 1) ? 0 : max + 1;
        }, 2500)
        return () => {
            intervalId && clearInterval(intervalId);
        }

    }, [])

    const handleClickBanner = (item) => {
        if(item?.type === 1){
            dispatch(actions.setCurSongId(item.encodeId));
            dispatch(actions.play(true));
        } else if(item?.type === 4) {
            const albumPath = item?.link?.split('.')[0];
            navigate(albumPath);
        }
    }

    return (
        <div className='flex gap-8 w-full overflow-hidden px-[59px] pt-8'>
            {banner?.map((item, index) => (
                <img src={item.banner} key={item.encodeId} alt='banner' onClick={()=>handleClickBanner(item)} className={`slider-item flex-1 object-cover w-[30%] rounded-lg ${index <= 2 ? 'block' : 'hidden'}`} />
            ))}
        </div>
    )
}

export default Slider;