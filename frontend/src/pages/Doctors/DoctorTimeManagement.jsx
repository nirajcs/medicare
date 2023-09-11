import React, { useState } from 'react'

const DoctorTimeManagement = () => {
    
    const [date,setDate] = useState('')
    const [from,setFrom] = useState('')
    const [to,setTo] = useState('')
 
    const handleSubmit = () => {
        const convertedDate = new Date(date).toISOString();
        const convertedFrom = new Date(from).toTimeString();
        const convertedTo = new Date(to).toTimeString();
        console.log(`Date: ${convertedDate}`);
        console.log(`From: ${convertedFrom}`);
        console.log(`To: ${convertedTo}`);
    }
  return (
    <section className="container">
        <div className='flex'>
            <div className='mx-2 border-2 px-2 border-blue-300 rounded'>
                <label htmlFor="from">Date : </label>
                <input type="date" className='h-full outline-none focus:outline-none' value={date} onChange={(e)=>{setDate(e.target.value)}} name="time" id="from" />
            </div>
            <div className='mx-2 border-2 px-2 border-blue-300 rounded'>
                <label htmlFor="from">From : </label>
                <input type="time" className='h-full outline-none focus:outline-none' value={from} onChange={(e)=>{setFrom(e.target.value)}} name="time" id="from" />
            </div>
            <div className='mx-2 border-2 px-2 border-blue-300 rounded'>
                <label htmlFor="from">To : </label>
                <input type="time" value={to} onChange={(e)=>{setTo(e.target.value)}} className='h-full outline-none focus:outline-none' name="time" id="from" />
            </div>
            <button onClick={handleSubmit}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                SUBMIT
            </button>
        </div>
    </section>
  )
}

export default DoctorTimeManagement