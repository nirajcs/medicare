import React, { useEffect, useState } from 'react'
import { doctorApi } from '../../axiosApi/axiosInstance'
import { useLocation } from 'react-router-dom';

const DoctorDetails = () => {

    const [details,setDetails] = useState({})

    const location = useLocation();
    const doctorId = location.state;
    useEffect(() => {
        const fetchDoctor = async()=>{
            let res = await doctorApi.get(`/getdoctor/${doctorId}`)
            console.log(res.data)
            setDetails(res.data);
        }
        fetchDoctor();
    }, [])
    let address = details.address ? details.address.split('\r\n') : [];
    let qualification = details.qualification ? details.qualification.split('\r\n') : [];
    let experience = details.experience ? details.experience.split('\r\n') : [];
    
    console.log(address)
    return (
        <section className='container mt-5'>
            <div className="flex flex-col my-5 md:flex-row md:justify-start items-center">
                <div className="image md:shrink-0 bg-blue-500 h-60 w-56 rounded-lg">
                    <img className='h-full w-full object-cover rounded-lg' src={`http://localhost:5000/images/doctors/${details.imagePath}`} alt="" />
                </div>
                <div className='details text-center md:text-left h-full'>
                    <div className="flex justify-center md:justify-start py-2">
                        <h1 className='px-2 font-bold text-3xl'>{details.name}</h1>
                        <span className="h-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">{details.specialization}</span>
                    </div>
                    <h3 className='p-2 font-medium '>Consulting fee : <span className='text-blue-500 font-bold'> {details.fees}</span></h3>
                    <h4 className='p-2 font-medium'>
                    {address.map((line, index) => (
                        <span className='block' key={index}>{line}</span>
                    ))}
                    </h4>
                    <div className='flex h-fit my-3'>
                    <div className='mx-2 flex border-2 items-center px-2 h-fit border-blue-300 rounded'>
                        <label htmlFor="from" className='w-1/3'>Date : </label>
                        <input type="date" className='w-2/3 py-1 outline-none focus:outline-none' name="time" id="from" />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                        Book Slot
                    </button>
                    </div>
                </div>
            </div>

            <div className="flex w-full my-5 py-4">
                <div className="w-1/2 border-r-2 border-blue-500">
                    <h3 className='font-bold text-blue-500'>Experience</h3>
                    <h4 className='py-2 font-medium'>
                        {experience.map((line, index) => (
                            <span className='block' key={index}>{line}</span>
                        ))}
                    </h4>
                </div>
                <div className="w-1/2 px-3 border-l-2 border-blue-500">
                    <h3 className='font-bold text-blue-500'>Qualification</h3>
                    <h4 className='py-2 font-medium'>
                        {qualification.map((line, index) => (
                            <span className='block' key={index}>{line}</span>
                        ))}
                    </h4>
                </div>
            </div>
        </section>
    )
}

export default DoctorDetails