import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/images/doctor-login.jpg'
import { Link, useNavigate } from 'react-router-dom' 
import { useLoginMutation } from '../../slices/doctorSlices/doctorsApiSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../slices/doctorSlices/doctorAuthSlice'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {doctorInfo} = useSelector((state)=>state.docAuth);

  useEffect(() => {
    if(doctorInfo){
      navigate('/doctors/home')
    }
  }, [navigate,doctorInfo])
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login,{ isLoading }] = useLoginMutation();

  const submithandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await login({email,password}).unwrap();
      console.log(res)
      dispatch(setCredentials({...res}))
      navigate('/doctors/home')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <section className='p-4 px-5 lg:px-0'>
      <div className='faded-blue-div text-center md:text-left w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
          Hey! <span className='text-primaryColor'>Doctor,</span> Login Here
        </h3>
      </div>
 
      <div className='faded-blue-div m-3 md:flex md:items-center justify-between w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <div className='hidden md:block'>
          <img src={loginImg} alt="" />
        </div>
        <form onSubmit={submithandler} className="flex-col text-center md:mx-[60px] md:text-center">
          <div className="my-[20px]">
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Enter your email" className="px-2 py-1 w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className="my-[20px]">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="email" placeholder="Enter your password" className="px-2 py-1 w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className='flex items-center justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
          </div>
          <div className="my-[10px] text-[12px] flex items-center justify-center">
            <p className='text-textGray'>New User?</p>
            <Link to='/doctors/signup'>
              <p className='text-primaryColor mx-[2px]'>SignUp</p>
            </Link>
          </div>
        </form>

      </div>
    </section>
  )
}

export default Login