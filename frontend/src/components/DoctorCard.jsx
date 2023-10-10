import React from 'react'

const DoctorCard = (details) => {
  return (
    <div className='p-4 m-2 border-2 text-center border-blue-300 bg-blue-100 h-64 w-48 rounded'>
        <div className='w-full h-40 bg-blue-300'>
            <img src={`https://www.medicarez.online/images/doctors/${details.details.imagePath}`} className='w-full h-full' alt="doctor-image" />
        </div>
        <h2 className="text-[14px] text-headingColor font-[700] mt-3">{details.details.name}</h2>
        <span className="inline-flex items-center rounded-md bg-blue-50 mt-2 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{details.details.specialization}</span>
    </div>
  )
}

export default DoctorCard