import React from 'react'
import { BsFacebook,BsInstagram } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className='footer py-3 items-center'>
      <div className="container flex justify-between">
        <div>
          <p className='font-bold text-white'>MEDICARE</p>
        </div>
        <div className='hidden sm:block'>
          <a href="" className='font-medium text-white'>medicare@gmail.com</a> 
        </div>
        <div className='flex'>
          <a href="" className='mx-3 text-white'><BsFacebook/></a>
          <a href="" className='mx-3 text-white'><BsInstagram/></a>
          <a href="" className='mx-3 text-500 text-white md:hidden'><MdOutlineEmail/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer