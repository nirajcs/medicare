import React, { useEffect, useState } from 'react'
import signup from '../../assets/images/signup-img.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' 
import { useGoogleAuthMutation, useRegisterMutation } from '../../slices/usersApiSlice'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../slices/authSlice'

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpass, setConfirmPass] = useState('')

  const [register,{isLoading}] = useRegisterMutation();
  const [googleAuth,{authLoading}] = useGoogleAuthMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state)=>state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/home')
    }
  }, [navigate,userInfo])

  const authenticateData = async(credentialResponse)=>{
    try {
      let res = await googleAuth({credentialResponse}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/home');
    } catch (error) {
      toast.error("User Already Exists")
    }
  } 

  const submitHandler = async(e)=>{
    e.preventDefault(); 
    if(password !== confirmpass){
        toast.error('Passwords do not match!!')
    }else{
        try {
            const res = await register({ name,email,password }).unwrap();
            navigate('/otp',{ state: { email:res.email } });
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  }

  return (
    <GoogleOAuthProvider clientId="678811028248-01m1d5fpk16nh70ue047uj1hbbd7uin3.apps.googleusercontent.com">
      <section className='p-2 px-5 lg:px-0'>
        <div className='w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
          <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
            <span className='text-primaryColor'>Register</span> User
          </h3>
        </div>
  
        <div className='md:flex md:items-center md:text-center justify-between w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
          <div className='hidden md:block'>
            <img src={signup} className="h-96" alt="" />
          </div>
          <form onSubmit={submitHandler} className="flex-col text-center md:mx-[60px] md:text-center">
            <div className="my-[30px]">
              <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
            </div>
            <div className="my-[30px]">
              <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
            </div>
            <div className="my-[30px]">
              <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
            </div>
            <div className="my-[30px]">
              <input type="password" name="confirm-password" value={confirmpass} onChange={(e)=>setConfirmPass(e.target.value)} placeholder="Confirm your password" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
            </div>
            <div className='flex items-center justify-center'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
            </div>
            <div className="my-[10px] text-[12px] flex items-center justify-center">
              <p className='text-textGray'>New User?</p>
              <Link to='/'>
                <p className='text-primaryColor mx-[2px]'>Login</p>
              </Link>
            </div>
            <GoogleLogin
              onSuccess={credentialResponse => {
                authenticateData(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              text='Sign Up with Google'
            />
          </form>
        </div>
      </section>
    </GoogleOAuthProvider>
  )
}

export default Signup