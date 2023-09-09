import React, { useEffect, useState } from 'react'
import { adminApi } from '../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  
  const handleApprove = async(docId)=>{
    let res = await adminApi.put(`approve/${docId}`)
    if(res){
      toast.success("Updated Successfully")
    }else{
      toast.error("Failed to Update")
    }
  }

  useEffect(() => {
    const fetchDoctorsData = async()=>{
      let res = await adminApi.get('/doctordata')
      setDoctors(res.data.doctorsData)
    }
    fetchDoctorsData();
  }, [handleApprove])

  
  return (
    <section className='container'>      
      <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Sl.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Specialization
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Qualification
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Experience
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Options
                      </th>
                  </tr>
              </thead>
              <tbody className='border-2'>
                {(doctors.length>0)?(
                  doctors.map((doctor, index) => (
                    <tr className="bg-white border-b  hover:bg-gray-200 " key={index}>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        {doctor.name}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.email}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.address}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.specialization}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.qualification}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.experience}
                      </td>
                      {
                        (!doctor.approved)?(
                          <td className="px-6 py-4">
                            <button onClick={()=>{handleApprove(doctor._id)}} className="bg-green-100 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                              approve
                            </button>
                          </td>
                        ):(
                          <td className="px-6 py-4">
                            <button onClick={()=>{handleApprove(doctor._id)}} className="bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                              disapprove
                            </button>
                          </td>
                        )
                      }
                    </tr>
                  ))
                ):(
                  <tr className="bg-white border-b hover:bg-gray-200">
                    <td colSpan={8} className="px-6 py-4 font-medium text-gray-900 text-center">
                      No Doctors Found
                    </td>
                  </tr>
                )
              }
              </tbody>
          </table>
      </div>
    </section>
  )
}

export default AdminDoctors