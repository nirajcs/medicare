import React, { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import { AiFillMessage } from 'react-icons/ai'
import { doctorApi, usersApi } from "../../axiosApi/axiosInstance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import convertTo12HourFormat from "../../utils/convertTime";
import formatDate from "../../utils/convertDate";
import formatDateToUTC from "../../utils/inputDateConvert";
import slotMaker from "../../utils/slotMaker";

import {loadStripe} from '@stripe/stripe-js'
import { useSelector } from "react-redux";

const DoctorDetails = () => {
  const [details, setDetails] = useState({}); 
  const [available, setAvailable] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState('')
  const [slot,setSlot] = useState('')

  const {userInfo} = useSelector((state)=>state.auth)

  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const doctorId = id;

  const bookHandler = async ()=>{
    if(!date){
      toast.error("Please select a date")
      return
    }
    
    const pKey = 'pk_test_51Nub1dSCS75gx8NFs0YlcO9kfh3YvuEWKH9rGnr9c3qghxAGyX0xwkTdJsmLxqC3MnQqn8ilw05nKBdqWGrtK9VP00JHV0BXO6'
    const stripe = await loadStripe(pKey);

    const { data } = await usersApi.post("/payment", {
      date:date,
      user:userInfo._id,
      doctor:details._id,
      amount:details.fees
    });

    localStorage.setItem("bookingSuccess", JSON.stringify({status:true}));
    
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    console.log(result);

    if (result?.error) {
      toast.error(result.error);
    }
  } 

  const dateHandler = (e)=>{
    if(new Date(e.target.value) < Date.now()){
      toast.error("select a future date")
      return
    }
    setSlot('')
    let selectedDate = e.target.value
    let formattedDate = formatDateToUTC(selectedDate)
    console.log(formattedDate)

    //to check already booked slot count
    let slotCount = 0
    const existingBookingIndex = bookings.findIndex(
      (booking) => booking.date === formattedDate
    );
    console.log(existingBookingIndex)
    if(existingBookingIndex == -1){
      slotCount = 0
    }else{
      slotCount = bookings[existingBookingIndex].slots.length
    }

    let check = available.filter((temp)=>temp.date === formattedDate)
    if(check.length>0){
      console.log(check)
      let slots = slotMaker(check,slotCount)
      setSlot(slots)
      console.log(slots,"special Time")
    }else{
      let slots = 18 - slotCount //Slots divided from 10AM to 8PM.
      setSlot(slots)
      console.log("Normal Time")
    }
    setDate(selectedDate)
  }

  const chatHandler = async()=>{
    let res = await usersApi.post(`/get-or-createroom/${userInfo._id}/${doctorId}`)
    if(res){
      navigate(`/chats/${res.data._id}`)
    }
  }

  useEffect(() => {
    const fetchDoctor = async () => {
      let res = await doctorApi.get(`/getdoctor/${doctorId}`);
      console.log(res.data)
      setDetails(res.data);
      setAvailable(res.data.available);  
      setBookings(res.data.bookings)
    };
    fetchDoctor();
  }, []);

  let address = details.address ? details.address.split("\r\n") : [];
  let qualification = details.qualification
    ? details.qualification.split("\r\n")
    : [];
  let experience = details.experience ? details.experience.split("\r\n") : [];

  return (
    <section className="container flex-col h-5/6">
      <div className="flex flex-col lg:flex-row md:justify-start items-center">
        <div className="flex flex-col items-center md:flex-row">
          <div className="image md:shrink-0 bg-blue-500 h-60 w-56 rounded-lg">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={
                details.imagePath
                  ? `https://www.medicarez.online/images/doctors/${details.imagePath}`
                  : null
              }
              alt=""
            />
          </div>

          <div className="details text-center mx-5 md:text-left h-full">
            <div className="flex justify-center md:justify-start py-2">
              <h1 className="px-2 font-bold text-3xl">{details.name}</h1>
              <span className="h-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {details.specialization}
              </span>
            </div>
            <h3 className="p-2 font-medium ">
              Consulting fee :{" "}
              <span className="text-blue-500 font-bold"> {details.fees}</span>
            </h3>
            <h4 className="p-2 font-medium">
              {address.map((line, index) => (
                <span className="block" key={index}>
                  {line}
                </span>
              ))}
            </h4>
            <div className="flex h-fit my-3">
              <div className="mx-2 flex border-2 items-center px-2 h-fit border-blue-300 rounded">
                <label htmlFor="from" className="w-1/3">
                  Date :
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e)=>{dateHandler(e)}}
                  className="w-2/3 py-1 outline-none focus:outline-none"
                  name="time"
                  id="from"
                />
              </div>
              <button onClick={bookHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                Book Slot
              </button>
            </div>
            {
              slot &&  <p className="mx-2 text-red-500">{slot} slots available</p>
            }
          </div>
        </div>

        <div className="h-60 w-full lg:w-2/5">
          <h3 className="text-blue-500 font-bold my-2">Special Timings</h3>
          <div className="border-2 rounded-lg border-blue-300">
            <table className="min-w-full bg-blue-200 text-center text-sm font-light rounded-t-lg">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="w-16 py-4">
                    #
                  </th>
                  <th scope="col" className="w-36 py-4">
                    Date
                  </th>
                  <th scope="col" className="w-36 py-4">
                    From
                  </th>
                  <th scope="col" className="w-36 py-4">
                    To
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto max-h-36 rounded-b-lg">
              <table className="min-w-full bg-blue-100 text-center text-sm font-light">
                <tbody className="text-center overflow-y-auto">
                  {available.length > 0 ? (
                    available.map((date, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap w-16 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap w-36 py-4">
                          {formatDate(date.date)}
                        </td>
                        <td className="whitespace-nowrap w-36 py-4">
                          {convertTo12HourFormat(date.fromTime)}
                        </td>
                        <td className="whitespace-nowrap w-36 py-4">
                          {convertTo12HourFormat(date.toTime)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b dark:border-neutral-500">
                      <td
                        colSpan={4}
                        className="whitespace-nowrap px-3 py-4 font-medium"
                      >
                        No Special Timings
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <h6 className="font-bold text-xs text-blue-500">
            Normal timings will be from 10 am to 8 pm. (Breaks excluded)
          </h6>
        </div>
      </div>

      <div className="flex w-full my-10 py-4">
        <div className="w-1/2 border-r-2 border-blue-500">
          <h3 className="font-bold text-blue-500">Experience</h3>
          <h4 className="py-2 font-medium">
            {experience.map((line, index) => (
              <span className="block" key={index}>
                {line}
              </span>
            ))}
          </h4>
        </div>
        <div className="w-1/2 px-3 border-l-2 border-blue-500">
          <h3 className="font-bold text-blue-500">Qualification</h3>
          <h4 className="py-2 font-medium">
            {qualification.map((line, index) => (
              <span className="block" key={index}>
                {line}
              </span>
            ))}
          </h4>
        </div>
      </div>
      <div className="floating-message">
        <AiFillMessage onClick={chatHandler} style={{ fontSize: '3rem', color: 'blue' , cursor:'pointer'}}/>
      </div>
    </section>
  );
};

export default DoctorDetails;
