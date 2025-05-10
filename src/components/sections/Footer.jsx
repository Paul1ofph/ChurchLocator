import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#0e63b0] text-xs text-white text-center p-5'>
       © {new Date().getFullYear()}. All rights reserved.
    </div>
  )
}

export default Footer