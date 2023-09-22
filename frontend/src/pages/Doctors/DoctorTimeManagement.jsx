import React, { useEffect, useState } from 'react'
import { doctorApi } from '../../axiosApi/axiosInstance'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import convertTo12HourFormat from '../../utils/convertTime'


const DoctorTimeManagement = () => {
    
    const [date,setDate] = useState('')
    const [from,setFrom] = useState('')
    const [to,setTo] = useState('')
    const [timings,setTimings] = useState([])

    const { doctorInfo } = useSelector((state)=>state.docAuth);
    
    const handleSubmit = async () => {
        let docId = doctorInfo._id
        let newBody = {docId,date,from,to}
        let fromTime = new Date(`${date}T${from}:00Z`)
        let toTime = new Date(`${date}T${to}:00Z`)
        // if (timings.every(obj => new Date(obj.date).getTime() !== new Date(date).getTime())) {
            // If every date in timings array is not the same as the new date, you can add it
            if (new Date(date).getTime() > Date.now()) {
              if (fromTime < toTime) {
                let res = await doctorApi.post('/managetime', newBody);
                setDate('')
                setFrom('')
                setTo('')
                if (res) {
                  toast.success("Time Added Successfully");
                }
              } else {
                toast.error('Please add time correctly');
              }
            } else {
              toast.error('Please add a future date');
            }
        //   } else {
        //     toast.error('Date already added');
        //   }
          
    }

    const handleDelete = async(id)=>{
        let res = await doctorApi.get(`/delete-timing/${doctorInfo._id}/${id}`)
        if(res){
            toast.success("Deleted Successfully")
        }else{
            toast.error("Failed to Delete")
        }
    }

    useEffect(() => {
        const fetchTimings = async ()=>{
            let res = await doctorApi.get(`/get-timings/${doctorInfo._id}`)
            // console.log(res.data.timings)
            setTimings(res.data.timings)
        }
        fetchTimings();
    }, [handleSubmit,handleDelete])

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
        
        {/* Timing Table */}
        <div className="container">
            <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sl.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                From
                            </th>
                            <th scope="col" className="px-6 py-3">
                                To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (timings)?(
                                timings.map((time,index)=>(
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index+1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {time.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {convertTo12HourFormat(time.fromTime)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {convertTo12HourFormat(time.toTime)}
                                        </td>
                                        <td className="px-12 py-4">
                                            <FaTrash onClick={()=>{handleDelete(time._id)}} className='cursor-pointer'/>
                                        </td>
                                    </tr>
                                ))
                            ):(
                                <h3 className='font-bold text-blue-500'>NO SPECIAL TIMINGS</h3>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    </section>
  )
}

export default DoctorTimeManagement