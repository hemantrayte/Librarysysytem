import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
  
  const [Values, setValues] = useState({
    username:"",
    email:"",
    password:""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
       let name= e.target.name;
       let value = e.target.value;
       setValues({
        ...Values,
        [name]:value
       })
  }
  
  const submit = async(e) => {
    try {
      if(Values.username === "" || Values.email === "" || Values.password === ""){
        alert("All Fields are required");
      }
      else {
        const response = await axios.post("http://localhost:3001/api/auth/register", Values
        );
        alert(response.data.message);
        navigate("/login");
      }



    }catch(error){
      alert(error.response.data.message);
    }
  }
  
  return (
    <div className='h-[84vh] bg-zinc-900 px-12 py-8 flex items-center justify-center '>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-zinc-400'>
              Username
            </label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={Values.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='' className='text-zinc-400'>
              Email
            </label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='email'
              name='email'
              required
              value={Values.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='' className='text-zinc-400'>
             Password
            </label>
            <input
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={Values.password}
              onChange={handleChange}
            />
          </div>
        <button  onClick={submit}  className='px-2 py-1 mt-5 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SingUp</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
