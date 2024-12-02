import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'

const Navbar = () => {

  const dispatch = useDispatch();
 const navigate = useNavigate()


  const links = [
    {
      title:"Home",
      link:"/",
    },
    {
      title:"About Us",
      link:"/about",
    },
    {
      title:"All Books",
      link:"/allbooks",
    },
    {
      title:"Profile",
      link:"/profile",
    },
    // {
    //   title:"Admin Profile",
    //   link:"/profile",
    // },
  ]

 const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 
 if(isLoggedIn === false) {
  links.splice(2,2);
 }
 
//  const role = useSelector((state) => state.auth.role);
//  if(isLoggedIn == true && role === "admin"){
//   links.splice(2,3);
//  }
 
//  if(isLoggedIn == true && role === "user"){
//   links.splice(4,1);
//  }

  return (
    <div className=' flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
     <Link to="/" className='flex items-center'>
      <img className='h-10 me-4' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo' />
      <h1 className='text-2xl font-semibold'>Library</h1>
     </Link>
     <div className='nav-links-library flex items-center gap-4'>
      <div className='hidden md:flex gap-4'>
      {links.map((items, index) =>(
        <div className='flex items-center justify-end'>
          <Link
        to={items.link}
         className='hover:text-blue-500 transition-all duration-300 cursor-pointer' key={index}>
          {items.title}
          </Link>
        </div>
      ))}
      </div>
      <div className='hidden md:flex gap-4'>
        { 
          isLoggedIn === false && (
            <>
            <Link to="/login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
            <Link to="/signup" className='px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SingUp</Link>
            
            </>
          )
        }
        {
          isLoggedIn === true && (
            <Link to="/signup" className='px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'><button onClick={() => {
              dispatch(authActions.logout());
              dispatch(authActions.changeRole("user"));
              localStorage.clear("id")
              localStorage.clear("token");
              localStorage.clear("role");
              navigate("/");
            }}>LogOut</button></Link>
          )

        }
      </div>
      </div>
    </div>
  )
}

export default Navbar
