import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/description'
import Testimonials from '../components/Testimonials'
import Generatebtn from '../components/Generatebtn'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimonials/>
        <Generatebtn/>
    </div>
  )
}

export default Home