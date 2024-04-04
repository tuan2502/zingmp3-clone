import React, { useEffect } from 'react'
import { Header } from 'src/components';
import Slider from 'src/components/Slider';


const Home = () => {


  return (
    <div className='overflow-y-auto'>
      <div>
        <Slider />
      </div>
    </div>
  )
}

export default Home;