import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text 3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imaginations into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt=""  className='w-80 xl:w-96 rounded-lg'/>
        <div>
            <h1 className='text-3xl font-medium max-w-lg mb-4'>Introducing AI-Powered Text to Image Generator!</h1>
            <p className='text-gray-500 mb-4'>Turn your ideas into stunning visuals with our cutting-edge AI-powered text-to-image generator! Simply type your prompt, and watch as AI transforms words into breathtaking artwork in seconds. Whether you need realistic images, fantasy scenes, or unique designs, our powerful AI brings your imagination to life. No design skills? No problem—just describe it, and let AI do the magic! Create, inspire, and explore endless possibilities with the future of AI-generated art!</p>
            <p className='text-gray-500 mb-4'>Type it, see it, create it—AI-powered image generation at your fingertips! Whether you need artistic designs, lifelike scenes, or abstract concepts, our AI turns your words into captivating visuals effortlessly!</p>
            <p className='text-gray-500 mb-4'>Transform words into breathtaking visuals with our AI-powered text-to-image generator! Just type your idea, and let AI craft stunning, high-quality images in seconds. Whether it’s art, fantasy, or realism, your imagination is the only limit!</p>
        </div>
      </div>
    </div>
  )
}

export default Description