import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Usercard from './userCard'
const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store)=>store.feed);

  const getFeed = async()=>{
    if(feedData) return;
      try{
         const res = await fetch(BASE_URL+'/feed',{
          method:"GET",
          credentials: 'include'
         })
         const data = await res.json();
         dispatch(addFeed(data));
      }
      catch(err){
        console.log(err);
      }
  }
  useEffect(()=>{
    getFeed();
  },[])
  return (
   feedData && ( <div className='flex flex-wrap gap-4 justify-center p-4'>
     {feedData.map((user)=>( 
      <Usercard key={user._id} data={user} 
      />
     ))
      }
    </div>
  )
)
}

export default Feed