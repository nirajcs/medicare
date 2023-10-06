import React, { useEffect, useState } from 'react'
import { usersApi } from '../../axiosApi/axiosInstance'
import formatDate from '../../utils/convertDate'
import { useSelector } from 'react-redux'

const Bookings = () => {
    const { userInfo } = useSelector((state)=>state.auth)
    const [bookings, setBookings] = useState([])
    useEffect(()=>{
        const fetchBookings = async()=>{
            let res = await usersApi.get(`/get-bookings/${userInfo._id}`)
            setBookings(res.data)
            console.log(res.data)
        }
        fetchBookings()
    },[])
  return (
    <section className='container h-screen'>
        <div className='container h-4/5 overflow-y-auto overflow-x-hidden'>
            <div className="flex bg-blue-100 border-2 border-blue-300 flex-col rounded-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Doctor</th>
                                <th scope="col" className="px-6 py-4">Specialization</th>
                                <th scope="col" className="px-6 py-4">Date</th>
                                <th scope="col" className="px-6 py-4">Slot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (bookings.length>0)?(
                                        bookings.map((booking,index)=>(
                                            <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{booking.doctorName}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{booking.doctorSpecialization}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{formatDate(booking.date)}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{booking.slot}</td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td colSpan={5} className="whitespace-nowrap px-6 py-4 font-medium">No Bookings</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Bookings