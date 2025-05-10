import React from 'react'
import image from '../../assets/images/image.jpg'

const Hero = () => {
  return (
    <section className='p-4'>
        <div className='hero-image relative'>
            <img src={image} alt=""/>
            <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold'>Welcome to Our News Website</h1>
        </div>
    </section>
  )
}

export default Hero