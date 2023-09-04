import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/adminSlices/adminApiSlice';
import { logout } from '../../slices/adminSlices/adminAuthSlice';

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/admin');
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='flex justify-between'>
      <h1 className='text-5xl'>Admin Home</h1>
      <button onClick={logoutHandler} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">LOGOUT</button>
    </div>
  )
}

export default AdminHome