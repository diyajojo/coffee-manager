import React from 'react'
import { useState } from 'react';
import supabase from "../supabaseclient";
import { Link ,useNavigate} from "react-router-dom";

const SignUp = () => {
const [name, setName] =useState('');
const [pwd, setPwd] =useState('');
const [mail, setMail] =useState('');
// const [error, setError]=useState('');

const navigate = useNavigate();


 const handleSubmit = async (e)=>{
  e.preventDefault();

  try{
    const { data, error } = await supabase.auth.signUp(
      {
        email: mail,
        password: pwd,
        options: {
          data: {
            fulname: name,
          }
        }
        
      }
    )
    if(error)
      {
        alert(error)
        console.log(error)
      }
      if(data)
      {
        alert('check email for verification')
        setTimeout(() => {
          navigate('/home');
        }, 2000); // navigate to /home after 2 seconds
      }
      }
  catch(error)
  {
    alert(error)
    console.log('error caught')
  }
 }
  return (
    <div className="card bg-white rounded shadow-md p-4 md:p-6 lg:p-8 max-w-md mx-auto absolute top-20 left-15">
        <div className="card-header py-4 px-6">
          <h2 className="text-2xl text-gray-700 text-center font-primary font-bold mb-0">CREATE YOUR ACCOUNT</h2>
        </div>
        <div className="card-body p-4 md:p-6 lg:p-8">
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Email:</span>
              <input
                type="email"
                id="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 bg-white focus:outline-none focus:border-pink-400 focus:bg-white"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Full Name:</span>
              <input
                type="text"
                id="fname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 bg-white focus:outline-none focus:border-pink-400 focus:bg-white"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Password:</span>
              <input
                type="password"
                id="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 bg-white focus:outline-none focus:border-pink-400 focus:bg-white"
              />
            </label>
            <button
              type="submit"
              className="bg-gradient-to-br from-[#FFC499] to-[#FFA07A] w-40 text-white border-0 rounded p-2 px-3 font-secondary cursor-pointer mx-auto block mt-4 mb-4"
            >
              Create Account
            </button>
            <div>
            <p className='text-center text-gray-700'>Already have an account ?</p>
            <button
            onClick={() => {
            navigate('/login');
             }}
            className="bg-gradient-to-br from-[#FFC499] to-[#FFA07A] text-white border-0 rounded p-2 px-3 font-secondary cursor-pointer mx-auto block mt-4 mb-4"
           >
          Login
          </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default SignUp
