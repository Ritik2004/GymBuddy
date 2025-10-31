import React from 'react'
import  NavBar from './NavBar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import {BASE_URL} from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
const Body = () => {
 const dispatch = useDispatch();
  const navigate = useNavigate();
 const userData = useSelector((store)=>store.user);
  const fetchUser = async ()=>{
    if (userData) return; // If user data is already present, no need to fetch
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
          console.log("data:", data);
          dispatch(addUser(data));
           console.log('Redux state after dispatch:', userData);
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