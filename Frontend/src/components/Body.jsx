import React from 'react'
import  NavBar from './NavBar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import {BASE_URL} from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router'
const Body = () => {
 const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async ()=>{
       try{
          const res = await fetch(BASE_URL +'/profile/view' ,{
            credentials: 'include'
          })

          if (res.status === 401) {
        navigate('/login');
        return;
      }

      if (!res.ok) {
        console.error("Error fetching user:", res.status);
        return;
      }

          const data = await res.json();
          dispatch(addUser(data.user));
        }
       catch(err){
        if(err.status===401){
          navigate('/login');
        }
        console.log(err)
       }
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <div>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </div> 
  )
}

export default Body