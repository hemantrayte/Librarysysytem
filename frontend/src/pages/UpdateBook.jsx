import React from 'react'
import { useState , useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


const UpdateBook = () => {

  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    publishedYear: "",
    status:""
  });
  
  const {id} = useParams();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };
  
  const navigate = useNavigate();
  

  const change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...Data,
      [name]: value
    });
  }

  const submitt = async () => {
    try {
      if(
        Data.url === "" ||
        Data.title === ""||
        Data.author === ""||
        Data.publishedYear === "" ||
        Data.status === ""
      ){
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:3001/api/data/books/update",
          Data,
          {headers}
        );
        alert(response.data.message);
       
        setData("");
        alert(response.data.message);
        navigate(`/viewbook/${id}`)
      }
    } catch(error) {
      alert(error.response.data.message);;
    }
  };
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
  return (
    <div className='bg-zinc-800 h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
      Update Book
    </h1>
    <div className='p-4 bg-zinc-800 rounded'>
      <div>
        <label htmlFor='' className='text-zinc-400'>
          Image
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='url of image'
        name='url'
        required
        value={Data.url || ""}
        onChange={change} />
      </div>
      <div>
        <label htmlFor='' className='text-zinc-400'>
          Title
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='Book Title'
        name='title'
        required
        value={Data.title || ""}
        onChange={change} />
      </div>
      <div>
        <label htmlFor='' className='text-zinc-400'>
          Author
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='Book Author'
        name='author'
        required
        value={Data.author || ""}
        onChange={change} />
      </div>
      <div>
        <label htmlFor='' className='text-zinc-400'>
        PublishedYear
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='PublishedYear of Book'
        name='publishedYear'
        required
        value={Data.publishedYear || ""}
        onChange={change} />
      </div>
      <div>
        <label htmlFor='' className='text-zinc-400'>
          Author
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='Book Author'
        name='status'
        required
        value={Data.status || ""}
        onChange={change} />
      </div>
      <Link  className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'><button onClick={submitt}>Update Book</button></Link>
    </div>
   
    </div>
  )
}

export default UpdateBook
