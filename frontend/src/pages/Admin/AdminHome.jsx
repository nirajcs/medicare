import React, { useEffect, useState } from 'react'
import { Pie, Line } from "react-chartjs-2";
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
      <div className="md:flex md:justify-between mx-5">
        <div className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
          <h2 className='text-2xl text-blue-700 font-bold'>Total Users</h2>
          <h4 className='my-5 text-xl font-bold'>Count : <span className='text-blue-700'>{details.totalUsers}</span></h4>
        </div>
        <div className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
          <h2 className='text-2xl text-blue-700 font-bold'>Total Doctors</h2>
          <div className='md:flex md:justify-evenly my-5 text-xl font-bold'>
            <h4>Count :<span className='text-blue-700'>{details.totalDoctors}</span></h4>
            <h4>Approved :<span className='text-blue-700'>{details.totalApprovedDoctors}</span></h4>
          </div>
        </div>
        <div className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
          <h2 className='text-2xl text-blue-700 font-bold'>Total Bookings</h2>
          <h4 className='my-5 text-xl font-bold'>Count : <span className='text-blue-700'>{details.totalBookings}</span></h4>
        </div>
      </div>
      <div className='md:flex p-5 m-5 md:h-1/2 md:justify-between'>
        <div className="md:w-2/3 md:p-5">
          <Line
            data={data}
            options={options}
          />
        </div>
        <div className="md:w-1/3 p-5">
        <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </section>
  )
}

export default AdminHome
