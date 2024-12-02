import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ data }) => {
 const dispatch = useDispatch();
 const nevigate = useNavigate();
 const role = useSelector((state) => state.auth.role);


  return (
    <div  className='h-[50%] bg-zinc-800 p-4 rounded flex flex-col items-center justify-between'>
      
      <div className='flex items-center flex-col justify-center'>
      <img src={data.avatar} className='h-[12vh]' />
     <p className='mt-3 text-xl text-zinc-100 font-semibold'>
      {data.username}
     </p>
     <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
     <p className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></p>
     <p className='mt-3 text-xl text-zinc-100 font-semibold'>
      Role:{data.role}
     </p>
      </div>
      {
        role === "admin" && (
          <div className='w-full flex-col items-center justify-center hidden lg:flex'>
           <Link to="/" 
           className='text-zinc-100 font-semibold w-full py-2 text-center' >
           Home
           </Link>
           <Link to="/profile/book" 
           className='text-zinc-100 font-semibold w-full py-2 text-center' >
           Add Book
           </Link>
           
          </div>
        )
      }

    </div>
  )
}

export default Sidebar
