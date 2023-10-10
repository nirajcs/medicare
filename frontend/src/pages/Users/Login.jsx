import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/images/login-img.jpg'
import { useDispatch,useSelector } from 'react-redux'
import { useGoogleLoginMutation, useLoginMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' 
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{isLoading}] = useLoginMutation();
  const [googleLogin,{loginLoading}] = useGoogleLoginMutation();

  const { userInfo } = useSelector((state)=>state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/home')
    }
  }, [navigate,userInfo])

  const authenticateData = async(credentialResponse)=>{
    try {
      let res = await googleLogin({credentialResponse}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/home');
    } catch (error) {
      toast.error("This user is either invalid or blocked by admin.");
    }
  }
  
  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
        const res = await login({email,password}).unwrap();
        dispatch(setCredentials({...res}))
        navigate('/home')
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  }
  
  return (
    <GoogleOAuthProvider clientId='678811028248-01m1d5fpk16nh70ue047uj1hbbd7uin3.apps.googleusercontent.com'>
      <section className='px-5 mb-[98px] lg:px-0'>
        <div className='text-center md:text-left w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
          <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
            Hello User !<span className='text-primaryColor login-text'>Login</span> Here
          </h3>
        </div>
  
        <div className='md:flex md:items-center justify-between w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
          <div className='hidden md:block'>
            <img src={loginImg} alt="" />
          </div>
          <form onSubmit={submitHandler} className="flex-col text-center md:mx-[60px] md:text-center">
            <div className="my-[20px]">
              <input type="text" name="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
            </div>
            <div className="my-[20px]">
              <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
            </div>
            <div className='flex items-center justify-center'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
            </div>
            <div className="my-[10px] text-[12px] flex items-center justify-center">
              <p className='text-textGray'>New User?</p>
              <Link to='/signup'>
                <p className='text-primaryColor mx-[2px]'>SignUp</p>
              </Link>
            </div>
            <GoogleLogin
              onSuccess={credentialResponse => {
                authenticateData(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </form>

        </div>
      </section>
    </GoogleOAuthProvider>
  )
}

export default Login