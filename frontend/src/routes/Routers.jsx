import React from 'react'
import Home from '../pages/Users/Home'
import Login from '../pages/Users/Login'
import Signup from '../pages/Users/Signup'
import ForgotVerify from '../pages/Users/ForgotVerify'
import ResetPassword from '../pages/Users/ResetPassword'
import EmailVerify from '../pages/Users/EmailVerify'
import Profile from '../pages/Users/Profile'
import DoctorList from '../pages/Users/DoctorList'
import DoctorDetails from '../pages/Users/DoctorDetails'
import UserChats from '../pages/Users/UserChats'
import Bookings from '../pages/Users/Bookings'
import SuccessPayment from '../pages/Users/SuccessPayment'

import DoctorLogin from '../pages/Doctors/DoctorLogin'
import DoctorRegister from '../pages/Doctors/DoctorRegister'
import Doctors from '../pages/Doctors/Doctors'
import MyAppointments from '../pages/Doctors/MyAppointments'
import DoctorTimeManagement from '../pages/Doctors/DoctorTimeManagement'
import DoctorChat from '../pages/Doctors/DoctorChat'
import DoctorProfile from '../pages/Doctors/DoctorProfile'

import AdminLogin from '../pages/Admin/AdminLogin'
import AdminHome from '../pages/Admin/AdminHome'
import AdminBookings from '../pages/Admin/AdminBookings'
import AdminDoctors from '../pages/Admin/AdminDoctors'
import AdminUsers from '../pages/Admin/AdminUsers'

import PrivateRoute from '../components/PrivateRoute'
import DoctorsPrivateRoute from '../components/DoctorsPrivateRoute'
import AdminPrivate from '../components/AdminPrivate'

import {Routes,Route} from 'react-router-dom'

const Routers = () => {
  return (
    <Routes> 
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<EmailVerify/>}/>
        <Route path='/forgot' element={<ForgotVerify/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/bookings' element={<Bookings/>}/>
          <Route path='/doctorlist' element={<DoctorList/>}/>
          <Route path='/doctor-details/:id' element={<DoctorDetails/>}/>
          <Route path='/chats/:chatid' element={<UserChats/>}/>
          <Route path='/successpayment/:user/:doctor/:date' element={<SuccessPayment/>}/>
        </Route>
        

        <Route path='/doctors' element={<DoctorLogin/>}/>
        <Route path='/doctors/signup' element={<DoctorRegister/>}/>
        <Route path='' element={<DoctorsPrivateRoute/>}>
          <Route path='/doctors/home' element={<Doctors/>}/>
          <Route path='/doctors/appointments' element={<MyAppointments/>}/>
          <Route path='/doctors/managetime' element={<DoctorTimeManagement/>}/>
          <Route path='/doctors/chats' element={<DoctorChat/>}/>
          <Route path='/doctors/profile' element={<DoctorProfile/>}/>          
        </Route>

        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='' element={<AdminPrivate/>}>
          <Route path='/admin/home' element={<AdminHome/>}/>
          <Route path='/admin/userlist' element={<AdminUsers/>}/>
          <Route path='/admin/doctorslist' element={<AdminDoctors/>}/>
          <Route path='/admin/bookings' element={<AdminBookings/>}/>
        </Route>
        
    </Routes>
  )
}

export default Routers