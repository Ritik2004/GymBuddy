import React from 'react'
import { useState } from 'react'
import Usercard from './userCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const EditProfile = ({user}) => {
    const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  
  const saveProfile =async () => {
    try{
      const res = await fetch(BASE_URL + '/profile/edit',{
        method:"PUT",
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about
        })
      })
      const data = await res.json();
      dispatch(addUser(data.user));
    }
    catch(err){
        console.log(err);
    }
  }

  return (
    <div className='flex justify-center my-10 gap-2'>
    <div className='flex justify-center items-center '>
    <div className="card card-dash bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
   <div>
   
   <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text"
   className="input" 
   placeholder="Type here" 
   value={firstName}
  onChange={(e)=>setFirstName(e.target.value)}

   />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text"
   className="input" 
   placeholder="Type here" 
   value={lastName}
  onChange={(e)=>setLastName(e.target.value)}

   />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Photo URL</legend>
  <input type="text"
   className="input" 
   placeholder="Type here" 
   value={photoUrl}
  onChange={(e)=>setPhotoUrl(e.target.value)}
   />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Age</legend>
  <input type="text"
   className="input" 
   placeholder="Type here" 
   value={age}
  onChange={(e)=>setAge(e.target.value)}

   />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Gender</legend>
  <input type="text"
   className="input" 
   placeholder="Type here" 
   value={gender}
  onChange={(e)=>setGender(e.target.value)}

   />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">About</legend>
  <input type="text"
   className="input" 
   placeholder="Type here" 
   value={about}
  onChange={(e)=>setAbout(e.target.value)}

   />
</fieldset>

   </div>
    <div className="card-actions justify-center pt-2">
      <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
    </div>
  </div>
</div></div>
<Usercard data={{firstName, lastName, photoUrl, age, gender, about}} />
</div>

  )
}

export default EditProfile