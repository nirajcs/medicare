import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/doctorSlices/doctorsApiSlice';
import { logout } from '../../slices/doctorSlices/doctorAuthSlice';

const Doctors = () => {
  return (
    <div className='flex justify-between'>
      <h1 className='text-5xl'>Doctors Home</h1>
    </div>
  )
}

export default Doctors