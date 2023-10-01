import React, { useEffect, useState } from 'react'
import DataTableComponent from './DataTableComponent'
import { adminApi } from '../../axiosApi/axiosInstance'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  useEffect(()=>{
    const fetchBookings = async()=>{
      let res = await adminApi.get('/booking-details')
      setBookings(res.data)
    }
    fetchBookings()
  },[])
  return (
    <section className='container'>
      <div className='container h-screen'>
        {bookings.length > 0 && <DataTableComponent data={bookings} />}
      </div>
    </section>
  )
}

export default AdminBookings