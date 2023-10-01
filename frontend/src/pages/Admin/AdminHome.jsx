import React, { useEffect, useState } from 'react'
import { Pie, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { adminApi } from '../../axiosApi/axiosInstance'

const AdminHome = () => {
  // Import the Chart component from chart.js
  Chart.register(CategoryScale);

  const [details, setDetails] = useState({})

  useEffect(()=>{
    let fetchDetails = async()=>{
      let res = await adminApi.get('/getDashboardDetails')
      setDetails(res.data)
    }
    fetchDetails();
  })

  //BAR CHART CONFIGURATION
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Monthly Bookings",
        data: [10, 20, 30, 40, 50, 60, 30, 50 , 10, 70, 40, 20],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Monthly Bookings Bar Chart",
    },
  };

  //PIE CHART CONFIGURATION
  const pieData = {
    labels: ["Users", "Doctors", "Bookings"],
    datasets: [
      {
        data: [details.totalUsers, details.totalDoctors, details.totalBookings],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
  };

  const pieOptions = {
    title: {
      display: true,
      text: "Pie Chart",
    },
  };

  return (
    <section className='container'>
      <div className="flex justify-between mx-5">
        <div className="w-1/3 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
          <h2 className='text-2xl text-blue-700 font-bold'>Total Users</h2>
          <h4 className='my-5 text-xl font-bold'>Count : <span className='text-blue-700'>{details.totalUsers}</span></h4>
        </div>
        <div className="w-1/3 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
          <h2 className='text-2xl text-blue-700 font-bold'>Total Doctors</h2>
          <div className='flex justify-evenly my-5 text-xl font-bold'>
            <h4>Count :<span className='text-blue-700'>{details.totalDoctors}</span></h4>
            <h4>Approved :<span className='text-blue-700'>{details.totalApprovedDoctors}</span></h4>
          </div>
        </div>
        <div className="w-1/3 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
          <h2 className='text-2xl text-blue-700 font-bold'>Total Bookings</h2>
          <h4 className='my-5 text-xl font-bold'>Count : <span className='text-blue-700'>{details.totalBookings}</span></h4>
        </div>
      </div>
      <div className='flex p-5 m-5 h-1/2 justify-between'>
        <div className="w-2/3">
          <Bar
            data={data}
            options={options}
          />
        </div>
        <div className="w-1/3">
        <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </section>
  )
}

export default AdminHome
