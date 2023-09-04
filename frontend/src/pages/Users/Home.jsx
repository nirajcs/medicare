import React from 'react'
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='flex justify-between'>
      <h1 className='text-5xl'>User Home</h1>
      <button onClick={logoutHandler} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">LOGOUT</button>
    </div>
  )
}

export default Home