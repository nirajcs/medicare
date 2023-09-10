import {Fragment, useEffect,useRef} from 'react'
import logo from '../../assets/images/logo.png'
import { NavLink,Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { BiMenu } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { VscAccount } from 'react-icons/vsc'
import { useLogoutMutation } from '../../slices/doctorSlices/doctorsApiSlice'
import { logout } from '../../slices/doctorSlices/doctorAuthSlice'


const navlinks = [
  {
    path:'/doctors/home',
    display:'Home'
  },
  {
    path:'/doctors/appointments',
    display:'Appointments'
  },
  {
    path:'/doctors/managetime',
    display:'Time Management'
  }
]

const DoctorHeader = () => {

    const { doctorInfo } = useSelector((state)=>state.docAuth);

    const headerRef = useRef(null)
    const menuRef = useRef(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async()=>{
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/doctors');
      } catch (err) {
        console.log(err)
      }
    }
  
    const handleStickyHeader = ()=>{
      window.addEventListener('scroll',()=>{
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
          headerRef.current.classList.add('sticky__header')
        }else{
          headerRef.current.classList.remove('sticky__header')
        }
      })
    }
  
    useEffect(() => {
      handleStickyHeader()
    
      return () => {
        window.removeEventListener('scroll',handleStickyHeader)
      }
    })
  
    const toggleMenu = ()=>menuRef.current.classList.toggle('show__menu')
  
    return (
      <header className="header flex items-center" ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="medicarelogo" />
            </div>
  
            {
              (doctorInfo)?(
                <>
                  <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                    <ul className="menu flex items-center gap-[2.7rem]">
                      {
                        navlinks.map((link,index)=>
                          <li key={index}>
                            <NavLink to={link.path} className={navClass=>navClass.isActive?'text-primaryColor text-[16px] loading-7 font-[600]' : 'text-textColor text-[16px] loading-7 font-[500] hover:text-primaryColor'}>{link.display}</NavLink>
                          </li>
                        )
                      }
                      <li className='pt-5'>                      
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                          <VscAccount style={{ fontSize: '2rem', color: 'blue', backgroundColor:'#fff2e6' }}/>
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10  w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              <NavLink to='/doctors/profile' className={navClass=>navClass.isActive?'text-primaryColor px-4 text-[16px] loading-7 font-[600] block' : 'text-textColor px-4 text-[16px] loading-7 font-[500] hover:text-primaryColor block'}>Profile</NavLink>
                            </Menu.Item>
                            <Menu.Item>
                              <button onClick={logoutHandler} className="block text-red-500 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2">LOGOUT</button>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    </li>
                    </ul>
                  </div>
                  <span className='md:hidden' onClick={toggleMenu}>
                    <BiMenu className='w-6 h-6 cursor-pointer'/>
                  </span>
                </>
              ):null
            }
          </div>
        </div>
      </header>
    )
  }

export default DoctorHeader