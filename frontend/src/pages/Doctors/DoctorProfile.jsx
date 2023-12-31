import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { doctorApi } from '../../axiosApi/axiosInstance'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {doctorInfo} = useSelector((state)=>state.docAuth)

  const [submittingForm, setSubmittingForm] = useState(false);

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [specialization,setSpecialization] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [oldImage,setOldImage] = useState('');
  const [image,setImage] = useState('')
  const [resume,setResume] = useState('');
  const [qualification,setQualification] = useState('');
  const [experience,setExperience] = useState('');
  const [fees,setFees] = useState('');

  const submitHandler = async(e)=>{
    try {
      e.preventDefault()
      if(!name || !email || !specialization || !address || !qualification || !experience || !fees){
        toast.error("Name,Email,Specialization,Address,Qualification,Experience,Fees cannot be Empty!!")
        return
      }
      if(password !== confirmPassword){
        toast.error("Passwords are not matching")
        return;
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
      if (password && !passwordRegex.test(password)) {
        toast.error("Password must meet the criteria specified by the regex.");
        return;
      }
      const formData = new FormData();
      formData.append("id", doctorInfo._id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("specialization", specialization);
      formData.append("qualification", qualification);
      formData.append("experience", experience);
      formData.append("address", address);
      formData.append("fees", fees);
      formData.append("password", password);
      formData.append("file", image);
      formData.append("resume", resume);

      const res = await doctorApi.post('/updatedoctor',formData)
      console.log(res);
      setSubmittingForm(true)
      toast.success('Updated Successfully')
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  useEffect(()=>{
    const fetchDetails = async()=>{
      let res = await doctorApi.get(`/getdoctor/${doctorInfo._id}`)
      console.log(res.data)
      setName(res.data.name)
      setEmail(res.data.email)
      setSpecialization(res.data.specialization)
      setAddress(res.data.address)
      setOldImage(res.data.imagePath)
      setQualification(res.data.qualification)
      setExperience(res.data.experience)
      setFees(res.data.fees)
    }
    fetchDetails();
    setSubmittingForm(false);
  },[submittingForm])
  return (
    <section className="p-4 px-5 lg:px-0">
      <div className="faded-blue-div text-center md:text-left w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold">
          Doctor <span className="text-primaryColor">Profile</span>
        </h3>
      </div>

      <div className="faded-blue-div m-3 md:flex-col w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="md:flex md:justify-between md:mx-[60px] items-center"
        >
          <div className="px-2 m-2">
            <div className="flex">
              <div className="mb-2 h-40 me-2 bg-blue-300 w-1/2 rounded-lg">
                <img src={image?URL.createObjectURL(image):`https://www.medicarez.online/images/doctors/${oldImage}`} className='w-full h-full rounded-lg' alt="doctor-image" />
              </div>
              <div className="mb-2 ms-2 p-4 w-1/2">
                <div>
                  <label
                    htmlFor="uploadPhoto"
                    className="inline-block text-sm font-medium text-blue-500 dark:text-blue-200"
                  >
                    Upload your Photo
                  </label>
                  <input
                    className="relative py-1 m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                    id="uploadPhoto"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    type="file"
                  />
                </div>
              </div>
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter Your Name"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="specialization"
              >
                Specialisation
              </label>
              <input
                type="text"
                name="specialisation"
                id="specialization"
                value={specialization}
                onChange={(e)=>setSpecialization(e.target.value)}
                placeholder="Your Specialization"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                cols="50"
                rows="4"
                placeholder="Enter Your Address"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>
          </div>
          <div className="px-2">
          <div className="mb-3 flex">
              <div className="me-2 w-1/2">
                <label
                  htmlFor="uploadResume"
                  className="mb-2 inline-block text-blue-500 text-sm font-medium dark:text-blue-200"
                >
                  Upload your Resume
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                  id="uploadResume"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                />
                <p className="text-blue-500 text-xs font-bold mt-1">
                  Only pdf files are accepted**
                </p>
              </div>
              <div className="ms-2 w-1/2">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="fees"
                >
                  Fees
                </label>
                <input
                  type="number"
                  name="fees"
                  id="fees"
                  value={fees}
                  onChange={(e)=>setFees(e.target.value)}
                  placeholder="Enter Your Fees"
                  className="block mt-1 px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="my-[20px]">
              <div>
                <label
                  className="text-sm text-blue-500 font-medium"
                  htmlFor="qualification"
                >
                  Qualification
                </label>
                <textarea
                  name="qualification"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                  id="qualification"
                  value={qualification}
                  onChange={(e)=>setQualification(e.target.value)}
                  placeholder="Qualification"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="my-[20px]">
              <div>
                <label
                  className="text-sm text-blue-500 font-medium"
                  htmlFor="experience"
                >
                  Experience
                </label>
                <textarea
                  name="experience"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                  id="experience"
                  value={experience}
                  onChange={(e)=>setExperience(e.target.value)}
                  placeholder="Experience"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Confirm Password"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="Confirm Password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
        <div className="text-center">
          <p className="text-blue-500 font-bold my-2">
            **Approval is done by the admin team only after proper verification
          </p>
        </div>
      </div>
    </section>
  )
}

export default DoctorProfile