import icons from "./icons"


const { MdOutlineLibraryMusic, TbChartPie, TbChartArcs,MdOutlineFeed, } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <MdOutlineLibraryMusic size={24} />
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icon: <TbChartArcs size={24} />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <TbChartPie size={24} />
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <MdOutlineFeed size={24} />
    }
]