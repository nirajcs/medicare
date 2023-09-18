import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usersApi } from "../../axiosApi/axiosInstance";
import { useUpdateuserMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const Profile = () => {

  const {userInfo} = useSelector((state)=>state.auth)

  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [mobile, setMobile] = useState(userInfo?.mobile || '');
  const [blood, setBlood] = useState(userInfo?.blood || '');
  const [age, setAge] = useState(userInfo?.age || '');
  const [gender, setGender] = useState(userInfo?.gender || '');
  const [emerPerson, setEmerPerson] = useState(userInfo?.emergency?.name || '');
  const [emerNumber, setEmerNumber] = useState(userInfo?.emergency?.contact || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const [update,{isLoading}] = useUpdateuserMutation();
  const [submittingForm, setSubmittingForm] = useState(false);

  const submitHandler = async (e)=>{
    e.preventDefault();
    if(password === confirmPassword){
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
      if (password && !passwordRegex.test(password)) {
        toast.error("Password must meet the criteria specified by the regex.");
        return;
      }
      let id = userInfo._id
      let formData = {
        id,
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(blood && { blood }),
        ...(gender && { gender }),
        ...(emerPerson && { emerPerson }),
        ...(emerNumber && { emerNumber }),
        ...(password && {password}),
      };
      let res = await update(formData).unwrap();
      setPassword('')
      setConfirmPassword('')
      setSubmittingForm(true)
      toast.success('Updated Successfully')
    }else{
      toast.error("Passwords does not match!!!")
    }
  }

  useEffect(()=>{
    const fetchDetails = async()=>{
      let res = await usersApi.get(`/user-profile/${userInfo._id}`)
      setName(res.data.name?res.data.name:'')
      setEmail(res.data.email?res.data.email:'')
      setMobile(res.data.mobile?res.data.mobile:'')
      setBlood(res.data.blood?res.data.blood:'')
      setAge(res.data.age?res.data.age:'')
      setGender(res.data.gender?res.data.gender:'')
      setEmerPerson(res.data.emergency.name?res.data.emergency.name:'')
      setEmerNumber(res.data.emergency.contact?res.data.emergency.contact:'')
    }
    fetchDetails();
    setSubmittingForm(false);
  },[submittingForm])
  
  return (
    <section className="container max-w-[1000px]">
      <div className="faded-blue-div text-center md:text-left w-full mx-auto rounded-lg shadow-md p-3">
        <h3 className="text-primaryColor text-[22px] leading-9 font-bold">
          My Profile
        </h3>
      </div>
      <div className="faded-blue-div  text-center mt-3 md:text-left w-full mx-auto rounded-lg shadow-md p-3">
        <form onSubmit={submitHandler} encType="multipart/form-data" className="md:flex md:justify-between md:mx-[60px]">
          <div className="px-2 w-1/2">
          <h5 className="text-primaryColor font-bold">User Details</h5>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter Your Email"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="contact"
              >
                Contact Number
              </label>
              <input
                type="number"
                name="contact"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                id="contact"
                placeholder="Your Mobile"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                id="password"
                placeholder="Your Password"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="text"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                id="confirm-password"
                placeholder="Confirm Your Password"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="px-2 w-1/2">
            <h5 className="text-primaryColor font-bold">Additional Details</h5>
            <div className="flex my-[10px]">
              <div className="w-1/2 me-2">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="blood"
                >
                  Blood Group
                </label>
                <input
                  type="text"
                  name="blood"
                  value={blood}
                  onChange={(e) => setBlood(e.target.value)}
                  id="blood"
                  placeholder="Enter Your Blood Group"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-1/2 ms-2">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  id="age"
                  placeholder="Enter Your Age"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="my-[10px]">
              <label className="text-blue-500 text-sm font-medium" htmlFor="gender">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select Your Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="emergency"
              >
                Emergency Contact Person
              </label>
              <input
                type="text"
                name="emergency"
                value={emerPerson}
                onChange={(e) => setEmerPerson(e.target.value)}
                id="emergency"
                placeholder="Enter Name"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="mobile"
              >
                Emergency Contact Number
              </label>
              <input
                type="number"
                name="mobile"
                value={emerNumber}
                onChange={(e) => setEmerNumber(e.target.value)}
                id="mobile"
                placeholder="Enter Mobile"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[30px]">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
