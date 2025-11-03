import React from 'react'

const Usercard = ({data}) => {
    console.log("Usercard data:", data);
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={data.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {data.firstName} {data.lastName}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>Age: {data.age}</p>
    <p>Gender: {data.gender}</p>
    <p>{data.about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default Usercard