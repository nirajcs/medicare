import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usersApi } from '../../axiosApi/axiosInstance';
import { Link } from 'react-router-dom'
import { BsPatchCheckFill } from 'react-icons/bs'
import { VscError } from 'react-icons/vsc'

const SuccessPayment = () => {
  const [details,setDetails] = useState({})
  const bookingStatus = JSON.parse(localStorage.getItem('bookingSuccess'));
  const { user, doctor, date } = useParams();

  useEffect(() => {
    if (!bookingStatus || !bookingStatus.status) {
      console.error('Booking was not successful');
    } else {
        const bookAppointment = async()=>{
            let res = await usersApi.post(`/addbookings/${user}/${doctor}/${date}`)
            if(res){
              setDetails(res.data)
            }
        }
        bookAppointment();
        setTimeout(() => {
          localStorage.removeItem('bookingSuccess')
        }, 3000);
    }
  },[]);

  if (!bookingStatus || !bookingStatus.status) {
    return(
      <section className='px-5 h-screen lg:px-0'>
        <div className='text-center bg-red-100 w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
          <div className='flex justify-center'>
            <VscError style={{ fontSize: '60px',color: 'red' }}/>
          </div>
          <h3 className='my-5 text-red-700 text-[22px] font-bold'>
            Error in feching page
          </h3>
          <Link to='/'><h6 className='my-5 text-sm text-blue-500 underline'>Go to home page</h6></Link>
        </div>
      </section>
    )
  }
  return(
    <>
      {
        (details) ? (
          <section className='px-5 h-screen lg:px-0'>
            <div className='text-center bg-green-100 w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
              <div className='flex justify-center'>
                <BsPatchCheckFill style={{ fontSize: '60px',color: 'green' }}/>
              </div>
              <h3 className='my-5 text-green-700 text-[22px] font-bold'>
                Your booking was successfull
              </h3>
              <h3 className='my-5 text-green-500 text-[15px] font-bold'>
                Your slot number is {details ? details.slot : null}
              </h3>
              <Link to='/'><h6 className='my-5 text-sm text-blue-500 underline'>Go to home page</h6></Link>
            </div>
          </section>
        ):null
      }
    </>
  )
};

export default SuccessPayment;
