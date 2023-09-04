import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../slices/doctorSlices/doctorsApiSlice'
import { setCredentials } from '../../slices/doctorSlices/doctorAuthSlice'

const DoctorRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {doctorInfo} = useSelector((state)=>state.docAuth);

  useEffect(() => {
    if(doctorInfo){
      navigate('/doctors/home')
    }
  }, [navigate,doctorInfo])
   
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState('')
  const [qualification, setQualification] = useState('')
  const [experience, setExperience] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpass, setConfirmpass] = useState('')

  const [register,{isLoading}] =useRegisterMutation();

  const submitHandler = async(e)=>{
    e.preventDefault();
    if(password !== confirmpass){
        toast.error('Passwords do not match!!')
    }else{
      console.log("HI here")
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('specialization', specialization);
        formData.append('qualification', qualification);
        formData.append('experience', experience);
        formData.append('address', address);
        formData.append('password', password);
        formData.append('file', image);

        const res = await register(formData).unwrap();
        console.log(res)

        dispatch(setCredentials(res));
        toast.success("Registered successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <section className='p-4 px-5 lg:px-0'>
      <div className='faded-blue-div text-center md:text-left w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
          Doctor <span className='text-primaryColor'>Registration</span>
        </h3>
      </div>
 
      <div className='faded-blue-div m-3 md:flex-col w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5'>
        <form onSubmit={submitHandler} className="md:flex md:justify-between md:mx-[60px] items-center">
            <div className='px-2'>
                <div className="my-[10px]">
                  <label className="block font-medium text-blue-500 text-sm" htmlFor="small_size">Upload your Photo</label>
                  <input  type="file" onChange={(e)=>setImage(e.target.files[0])} className="p-0.5 text-xs text-900 cursor-pointer" id="small_size"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="name">Name</label>
                  <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} id='name' placeholder="Enter Your Name" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="email">Email</label>
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id='email' placeholder="Enter Your Email" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="mobile">Specialisation</label>
                  <input type="text" name="specialisation" value={specialization} onChange={(e)=>setSpecialization(e.target.value)} id='specialization' placeholder="Your Specialization" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="address">Address</label>
                  <textarea name="address" id='address' value={address} onChange={(e)=>setAddress(e.target.value)} cols="50" rows="4" placeholder='Enter Your Address' className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"></textarea>
                </div>
            </div>
            <div className='px-2'>
              <div className="my-[20px]">
                <div>
                  <label className='text-sm text-blue-500 font-medium' htmlFor="address">Qualification</label>
                  <textarea name="qualification" value={qualification} onChange={(e)=>setQualification(e.target.value)} className='block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none' id="qualification" placeholder='Qualification' cols="30" rows="2"></textarea>
                </div>
              </div>
              <div className="my-[20px]">
                <div>
                <label className='text-sm text-blue-500 font-medium' htmlFor="address">Experience</label>
                  <textarea name="experience" value={experience} onChange={(e)=>setExperience(e.target.value)} className='block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none' id="experience" placeholder='Experience' cols="30" rows="2"></textarea>
                </div>
                <div className="my-[20px]">
                <label className='text-blue-500 text-sm font-medium' htmlFor="Password">Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id='Password' placeholder="Enter Your Password" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
              </div>
              <div className="my-[20px]">
                <label className='text-blue-500 text-sm font-medium' htmlFor="Confirm Password">Confirm Password</label>
                <input type="password" name="password" value={confirmpass} onChange={(e)=>setConfirmpass(e.target.value)} id='Confirm Password' placeholder="Confirm Password" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
              </div>
              </div>
              <div className='flex items-center justify-center'>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register For Approval</button>
              </div>
              <div className="my-[10px] text-[12px] flex items-center justify-center">
                  <p className='text-textGray'>Already In?</p>
                  <Link to='/doctors'>
                  <p className='text-primaryColor mx-[2px]'>Login</p>
                  </Link>
              </div>
            </div>
        </form>
        <div className='text-center'>
          <p className='text-blue-500 font-bold my-2'>**Approval is done by the admin team only after proper verification</p>
        </div>
      </div>
    </section>
  )
}

export default DoctorRegister