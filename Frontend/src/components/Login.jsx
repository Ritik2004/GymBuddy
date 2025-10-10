import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
const Login = () => {
  const[emailId,setEmailId] = useState('Rahul@gmail.com');
  const[password,setPassword] = useState('Rahul@123');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
     try{
        const res = await fetch(BASE_URL+ '/login',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({emailId,password})
        ,credentials:'include'
        })
       const data = await res.json();
        dispatch(addUser(data.user));
        return navigate('/');
     }
     catch(err){
      console.log(err);
     }
  }

  return (
    <div className='flex justify-center items-center my-10'>
    <div className="card card-dash bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
   <div>
   
   <fieldset className="fieldset">
  <legend className="fieldset-legend">Email Id</legend>
  <input type="text"
   className="input" 
   placeholder="Type here" 
   value={emailId}
  onChange={(e)=>setEmailId(e.target.value)}

   />
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" 
  className="input" 
  placeholder="Type here" 
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  />
</fieldset>
   </div>
    <div className="card-actions justify-center pt-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div></div>
  )
}

export default Login