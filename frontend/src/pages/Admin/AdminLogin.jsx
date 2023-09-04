import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/images/admin-login.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../slices/adminSlices/adminApiSlice'
import { setCredentials } from '../../slices/adminSlices/adminAuthSlice'
import { toast } from 'react-toastify'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{isLoading}] = useLoginMutation();
  const { adminInfo } = useSelector((state)=>state.adminAuth);

  useEffect(() => {
    if(adminInfo){
      navigate('/admin/home')
    }
  }, [navigate,adminInfo])
  
  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
        const res = await login({email,password}).unwrap();
        dispatch(setCredentials({...res}))
        navigate('/admin/home')
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  }
  
  return (
    <section className='px-5 lg:px-0'>
      <div className='text-center md:text-left w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
            <span className='text-primaryColor'>Admin</span> Login
        </h3>
      </div>
 
      <div className='md:flex md:items-center justify-between w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <div className='hidden md:block'>
          <img src={loginImg} alt="" />
        </div>
        <form onSubmit={submitHandler} className="flex-col text-center md:mx-[60px] md:text-center">
          <div className="my-[20px]">
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Enter your email" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className="my-[20px]">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="email" placeholder="Enter your password" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className='flex items-center justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
          </div>
        </form>

      </div>
    </section>
  )
}

export default AdminLogin