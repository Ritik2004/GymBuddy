import React from 'react'
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connection);
    const fetchConnection = async () => {
         try{
           const res = await fetch(BASE_URL + "/user/connections",{
            method:"GET",
            credentials: 'include'  
           })
              const data = await res.json();
                dispatch(addConnection(data.data))
         }
         catch(err){
              console.log(err);
         }
    }
    useEffect(() => {
        fetchConnection();
    }, []);

    if(!connections) return;

    if(connections.length === 0){
        return ( <div>You have no connection</div>
        )
    }

  return (
    <div className='text-center my-10'>
        <h1 className='text-3xl text-white font-bold'>Connections</h1>
        {
            connections.map((connection)=>{
                return (
                    <div className='flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto' key={connection._id}>
                    <div>
                     <img src={connection.photoUrl} style={{width: "80px", height: "80px"}} alt={connection.firstName} />
                    </div>
                    <div className='text-left mx-4'>
                     <h2 className='font-bold'>{connection.firstName} {connection.lastName}</h2>
                     <p>{connection.age} years old</p>
                     <p>{connection.about}</p>
                     </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Connections