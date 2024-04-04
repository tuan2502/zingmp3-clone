import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
}


const appReducer = (state = initState, action) => {
    
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === 'banner').items || null
            };

        default:
            return state;
    }
}

export default appReducer;



// }, {
//     "type": 4,
//     "link": "/playlist/Nhac-Moi-Moi-Tuan/67WIO6CF.html",
//     "banner": "https://dt.muvi.vn/mvn/social/playlist/2021/11/05/banner-nhac-tre-edm_20211105162004.jpg",
//     "cover": "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/a/d/b/f/adbf3a9ed36e16517f9bea68c31c61cd.jpg",
//     "target": "1",
//     "title": "",
//     "description": "",
//     "ispr": 0,
//     "encodeId": "ZW79ZBE8"
// }