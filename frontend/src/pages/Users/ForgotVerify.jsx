import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'

const ForgotVerify = () => {
    const [emailSend, setEmailSend] = useState(false);
    const [email,setEmail] = useState('');
    const [otp,setOtp] = useState('')
    const navigate = useNavigate()

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(emailSend){
            if(!email || !otp){
              toast.error("Email and otp are required")
              return
            }
            try {
              let res = await usersApi.post('/forget-otp-verify',{email,otp})
              if(res){
                navigate('/reset',{ state: { email:res.data.email } })
              }
            } catch (err) {
              toast.error(err?.response?.data.error);
            }
        }else{
            if(!email){
              toast.error("Enter your email")
              return
            }
            try{
                let res = await usersApi.post('/forget-email-verify',{email})
                if(res){
                  setEmailSend(true)
                }
            }catch(err){
                toast.error(err?.response?.data.error);
            }
        }
    }
  return (
    <section className='px-5 lg:px-0 h-screen'>
      <div className='text-center md:text-left w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
          Verify Your <span className='text-primaryColor'>Email</span>
        </h3>
      </div>
 
      <div className='md:items-center w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <form onSubmit={submitHandler} className="flex-col text-center md:mx-[60px] md:text-center">
          <div className="my-[20px]">
            <input readOnly={emailSend} type="email" onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Enter your email" className="w-[250px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className={`my-[20px] ${emailSend ? 'block' : 'hidden'}`}>
            <input type="text" onChange={(e)=>setOtp(e.target.value)} name="otp" placeholder="Enter your OTP" className="w-[250px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          {
            (emailSend) ? (
                <div className='flex items-center justify-center'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Verify OTP</button>
                </div>
            ):(
                <div className='flex items-center justify-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send OTP</button>
                </div>
            )
          }
        </form>

      </div>
    </section>
  )
}

export default ForgotVerify