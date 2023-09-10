import React from 'react'

const DoctorCard = () => {
  return (
    <div className='p-4 m-2 border-2 text-center border-blue-300 bg-blue-100 h-64 w-48 rounded'>
        <div className='w-full'>
            <img src="https://media.istockphoto.com/id/138205019/photo/happy-healthcare-practitioner.jpg?s=612x612&w=is&k=20&c=kY5CQ44NJ7szjh72pAKHqPdJxM-hoh2Hue8tq_vuJ7A=" className='object-cover' alt="doctor-image" />
        </div>
        <h2 className="text-[14px] text-headingColor font-[700] mt-3">Abhraham Zacheriah</h2>
        <span className="inline-flex items-center rounded-md bg-blue-50 mt-2 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">ENT</span>
    </div>
  )
}

export default DoctorCard