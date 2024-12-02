import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Loader from '../pages/Loader';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth'
import { FaEdit } from "react-icons/fa"
import { MdOutlineDelete } from "react-icons/md"

const ViewBookDetail = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
   
  // const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/data/allbooks/${id}`
      );
      
      console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id:localStorage.getItem(id),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }

  const deleteBook = async() => {
  const response = await axios.delete("http://localhost:3001/api/data/books/delete",
    { headers}
   );
   alert(response.data.message);
   navigate("/allbooks");
  }

  return (
   <>
  {
        !Data && (
          <div className='flex items-center justify-center my-8'>
            <Loader />
          </div>
        )}

        {
          isLoggedIn === true && role === "admin" && (
            <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
              <Link to={`/updateBook/${id}`} className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center'>
                <FaEdit />
                <span className='ms-4 block lg:hidden'>Edit</span>
              </Link>
              <button className='bg-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center' onClick={deleteBook}>
                <MdOutlineDelete />
                <span className='ms-4 block lg:hidden'>Delete</span>
              </button>
{/* 
              <Link to={`/updateBook/${id}/status`} className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center'>
                
                <button className='ms-4 block lg:hidden'>Edit Status</button>
              </Link> */}
            </div>
          )
        }
    <div className='px-12 py-8 bg-zinc-900 flex gap-8'>
      <div className='bg-zinc-800 rounded p-4 h-[88vh] w-3/6 flex items-center justify-center'><img src={Data.url} alt='img' className='h-[70vh]' /></div>
      <div className='p-4 w-3/6'>
      <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
      <p className='text-zinc-400'>by {Data.author}</p>
      <p className='text-zinc-500 mt-4 text-xl'>{Data.publishedYear}</p>
      <p className='mt-4 text-zinc-100 text-3xl font-semibold'>{Data.status}</p>
      </div>
    </div>
   </>
  );
}

export default ViewBookDetail
