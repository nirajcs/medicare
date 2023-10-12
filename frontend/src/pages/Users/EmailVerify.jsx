import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useVerifyMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

const EmailVerify = () => {
    const [otp, setOtp] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const location = useLocation();
    const email = location.state.email;

    const [verify,{ isLoading }] = useVerifyMutation()
  
    const submitHandler = async(e)=>{
      e.preventDefault();
      try {
          const res = await verify({email,otp}).unwrap();
          console.log(res)
          if(res.error){
            toast.error(res.error)
            return
          }
          dispatch(setCredentials({...res}));
          navigate('/home');
      } catch (err) {
          toast.error(err?.data?.message || err.error);
      }
    }

  return (
    <section className='px-5 lg:px-0'>
      <div className='text-center md:text-left w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
          Enter <span className='text-primaryColor'>OTP</span> here
        </h3>
      </div>
 
      <div className='md:items-center w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <form onSubmit={submitHandler} className="flex-col text-center md:mx-[60px] md:text-center">
            <input type="hidden" name="email" value={email}/>
          <div className="my-[20px]">
            <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} name="otp" placeholder="Enter your OTP" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className='flex items-center justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Verify</button>
          </div>
        </form>

      </div>
    </section>
  )
}

export default EmailVerify