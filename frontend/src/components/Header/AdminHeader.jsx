import {useEffect,useRef} from 'react'
import logo from '../../assets/images/logo.png'
import { NavLink,Link, useLocation, useNavigate } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { FiLogOut } from 'react-icons/fi'
import { useLogoutMutation } from '../../slices/adminSlices/adminApiSlice'
import { logout } from '../../slices/adminSlices/adminAuthSlice'

const navlinks = [
  {
    path:'/admin/home',
    display:'Home'
  },
  {
    path:'/admin/userlist',
    display:'Users'
  },
  {
    path:'/admin/doctorslist',
    display:'Doctors'
  },
  {
    path:'/admin/bookings',
    display:'Bookings'
  }
]
const AdminHeader = () => {

    const { adminInfo } = useSelector((state)=>state.adminAuth);

    const headerRef = useRef(null)
    const menuRef = useRef(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async()=>{
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/admin');
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
              (adminInfo)?(
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
                      <li onClick={logoutHandler} className='md:hidden font-bold text-red-500'>
                        LOGOUT
                      </li>
                      <li className='hidden md:block'>
                        <FiLogOut onClick={logoutHandler} style={{ fontSize: '2rem', cursor:'pointer', color: 'blue', backgroundColor:'#fff2e6' }}/>
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

export default AdminHeader