import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img className="" src={assets.Pictora_logo} alt="" width={150}/>
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-black max-sm:hidden'>Copyright Nikhil and Nilesh developers | All rights reserved</p>

      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="" width={35}/>
        <img src={assets.twitter_icon} alt="" width={35}/>
        <img src={assets.instagram_icon} alt="" width={35}/>
      </div>

    </div>
  )
}

export default Footer
