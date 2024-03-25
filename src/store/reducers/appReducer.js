import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [{
        "type": 4,
        "link": "/playlist/Trao-Luu-Nhac-Hot/60B8U0OB.html",
        "banner": "https://photo-zmp3.zmdcdn.me/banner/8/c/0/c/8c0ca4de49bc416d607883d66c8494b0.jpg",
        "cover": "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/3/9/8/e/398e9ea699a3d1d0ea28dde20f7d1d99.jpg",
        "target": "1",
        "title": "",
        "description": "",
        "ispr": 0,
        "encodeId": "60B8U0OB"
    },
    {
        "type": 4,
        "link": "/playlist/V-Pop--Hits-Quoc-Dan/ZBD8A996.html",
        "banner": "https://photo-zmp3.zmdcdn.me/banner/c/5/f/0/c5f01e7d7fcf8dc72fafda5d5bde2d9b.jpg",
        "cover": "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/8/b/7/4/8b74cebe0048ba7d8fde4f6700bb64b2.jpg",
        "target": "1",
        "title": "",
        "description": "",
        "ispr": 0,
        "encodeId": "ZBD8A996"
    },
    {
        "type": 4,
        "link": "/playlist/Nhac-Moi-Moi-Tuan/67WIO6CF.html",
        "banner": "https://photo-zmp3.zmdcdn.me/banner/7/f/5/6/7f5662aada7e4c4b8db935830f988acc.jpg",
        "cover": "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/a/d/b/f/adbf3a9ed36e16517f9bea68c31c61cd.jpg",
        "target": "1",
        "title": "",
        "description": "",
        "ispr": 0,
        "encodeId": "67WIO6CF",

    }, {
        "type": 4,
        "link": "/playlist/Nhac-Moi-Moi-Tuan/67WIO6CF.html",
        "banner": "https://dt.muvi.vn/mvn/social/playlist/2021/11/05/banner-nhac-tre-edm_20211105162004.jpg",
        "cover": "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/a/d/b/f/adbf3a9ed36e16517f9bea68c31c61cd.jpg",
        "target": "1",
        "title": "",
        "description": "",
        "ispr": 0,
        "encodeId": "67WIO6CZ"
    }
    ],
}


console.log(initState.banner);
const appReducer = (state = initState, action) => {
    
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                // banner: action.homeData?.find(item => item.sectionType === 'banner').items || null
            };

        default:
            return state;
    }
}

export default appReducer;