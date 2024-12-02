import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import BookCard from '../components/BookCard'
import axios from "axios";
import { Link } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

const AllBooks = () => {

  const [Data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/data/allbooks"
      );
      dispatch(authActions.login());
      setData(response.data.data);
    };
    fetch();
  }, [])

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100'>All Books</h4>
      {
        !Data && (
          <div className='flex items-center justify-center my-8'>
            <Loader />
          </div>
        )}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {
          Data &&
          Data.map((items, i) => {
             return <div key={i}>
              <BookCard data={items} />
              {/* <Link >
                <div className='bg-zinc-800 rounded p-4 flex flex-col'>
                  <div className='bg-zinc-900 rounded flex items-center justify-center'>
                    <img src={items.url} alt='/' className='h-[25vh]' />
                  </div>
                  <h2 className='mt-4 text-xl text-white font-medium'>{items.title}
                  </h2>
                  <p className='mt-2 text-zinc-400 font-semibold'>by {items.author}</p>
                  <p className='mt-2 text-zinc-200 font-semibold text-xl'>{items.status}</p>
                </div>
              </Link> */}
            </div>
          })
        }
      </div>
    </div>
  )
}

export default AllBooks
