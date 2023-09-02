import React from 'react'
import Home from '../pages/Users/Home'
import Login from '../pages/Users/Login'
import Signup from '../pages/Users/Signup'
import Profile from '../pages/Users/Profile'
import DoctorLogin from '../pages/Doctors/DoctorLogin'
import DoctorRegister from '../pages/Doctors/DoctorRegister'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminHome from '../pages/Admin/AdminHome'

import {Routes,Route} from 'react-router-dom'

const Routers = () => {
  return (
    <Routes> 
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>

        <Route path='/doctors' element={<DoctorLogin/>}/>
        <Route path='/doctors/signup' element={<DoctorRegister/>}/>

        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/home' element={<AdminHome/>}/>
    </Routes>
  )
}

export default Routers