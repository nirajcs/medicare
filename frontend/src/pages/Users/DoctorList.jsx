import React, { useEffect, useState } from 'react'
import DoctorCard from '../../components/DoctorCard'
import { usersApi } from '../../axiosApi/axiosInstance'
import { Link } from 'react-router-dom'

const DoctorList = () => {
  const [doctors, setDoctors] = useState([])
  const [search,setSearch] = useState('')

  useEffect(() => {
    const fetchDoctors = async ()=>{
      let res = await usersApi.get('/get-doctors')
      setDoctors(res.data.doctorsData)
    }
    fetchDoctors();
  },[])

  const filteredDoctors = doctors.filter((doctor)=>doctor.approved===true && doctor.blocked===false && 
  (doctor.name.toLowerCase().includes(search.toLowerCase()) ||
  doctor.specialization.toLowerCase().includes(search.toLowerCase())
  ))
  
  return (
    <section className='container'> 
      <form className='w-1/2 mb-4'>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" value={search} onChange={(e)=>{setSearch(e.target.value)}} id="default-search" className="block w-full outline-none p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for Doctors or Department here" required/>
        </div>
        {/* <button type='button' onClick={()=>{console.log(search)}}>CLICK HERE</button> */}
      </form>
      <div className="flex grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {
          (filteredDoctors.length !== 0)?(
            filteredDoctors.map((doctor,index)=>(
              <Link to={`/doctor-details/${doctor._id}`} key={index}>
                <DoctorCard className='cursor:pointer' details={doctor}/>
              </Link>
            ))
          ):(
            <div className='flex text-center w-full'>
              <h3 className='text-blue-500 font-bold'>No Doctors Found</h3>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default DoctorList