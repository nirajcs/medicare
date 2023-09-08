import React, { useEffect, useState } from 'react'
import { adminApi } from '../../axiosApi/axiosInstance';

const AdminUsers = () => {

  const [users,setUsers] = useState([])

  useEffect(() => {
    const fetchUserData = async()=>{
      const res = await adminApi.get('/userdata');
      setUsers(res.data.userData)
    };
    fetchUserData()
  },[])
   
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
                          Blood Group
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Options
                      </th>
                  </tr>
              </thead>
              <tbody className='border-2'>
                {users && users.map((user, index) => (
                  <tr className="bg-white border-b  hover:bg-gray-200 " key={index}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {user.name}
                    </td>
                    <td className="px-6 py-4">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      {user.blood}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>
    </section>
  )
}

export default AdminUsers