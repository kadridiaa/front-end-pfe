import React from 'react'
import HomeImg from '../component/home/HomeImg'
import FeaturedProducts from '../component/home/FeaturedProducts'

function Home() {
  return (
    <div className='h-screen flex flex-col overflow-y-scroll'>
      {/* <HomeImg/> */}
      <FeaturedProducts/>
      
    </div>
  )
}

export default Home
