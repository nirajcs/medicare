import React from 'react'
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const Home = () => {
  return (
    <div className='flex justify-between'>
      <h1 className='text-5xl'>User Home</h1>
    </div>
  )
}

export default Home