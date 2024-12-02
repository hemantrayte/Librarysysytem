import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    publishedYear: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

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
        Data.publishedYear === ""
      ){
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/data/books",
          Data,
          {headers}
        );
        alert(response.data.message);
       
        setData("");
        alert(response.data.message);
      }
    } catch(error) {
      alert(error.response.data.message);;
    }
  }

  return (
    <div className='h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
      Add Book
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
      <Link  className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'><button onClick={submitt}>Add Book</button></Link>
    </div>
   
    </div>
  )
}

export default AddBook
