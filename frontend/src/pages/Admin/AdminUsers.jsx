import React, { useEffect, useState } from 'react'
import { adminApi } from '../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'

const AdminUsers = () => {

  const [users,setUsers] = useState([]);

  const handleBlock = async(userId)=>{
    let res = await adminApi.put(`/block-user/${userId}`)
    if(res){
      toast.success("Updated Successfully")
    }else{
      toast.error("Failed to Update")
    }
  }

  useEffect(() => {
    const fetchUserData = async()=>{
      const res = await adminApi.get('/userdata');
      setUsers(res.data.userData)
    };
    fetchUserData()
  },[handleBlock])
   
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
                {(users.length>0)?(
                  users.map((user, index) => (
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
                      {
                        (user.blocked)?(
                          <td className="px-6 py-4">
                            <button onClick={()=>{handleBlock(user._id)}} className="bg-yellow-100 hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                              Unblock
                            </button>
                          </td>
                        ):(
                          <td className="px-6 py-4">
                            <button onClick={()=>{handleBlock(user._id)}} className="bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                              Block
                            </button>
                          </td>
                        )
                      }
                      
                    </tr>
                  ))
                ):(
                  <tr className="bg-white border-b hover:bg-gray-200">
                    <td colSpan={8} className="px-6 py-4 font-medium text-gray-900 text-center">
                      No users Found
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

export default AdminUsers