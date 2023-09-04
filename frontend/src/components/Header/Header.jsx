import {useEffect,useRef} from 'react'
import logo from '../../assets/images/logo.png'
import { NavLink,Link, useLocation } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const navlinks = [
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/doctorlist',
    display:'Doctors'
  },
  {
    path:'/profile',
    display:'Profile'
  }
]

const Header = () => {

  const { userInfo } = useSelector((state)=>state.auth)

  const headerRef = useRef(null)
  const menuRef = useRef(null)

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
            (userInfo)?(
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

export default Header