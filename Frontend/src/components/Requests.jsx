import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import { removeRequest } from "../utils/requestSlice";
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await fetch(BASE_URL + "/request/review/" + status + "/" + _id, {
        method: "POST",
        credentials: "include",
      });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  }

  const getRequests = async () => {
    try {
      const res = await fetch(BASE_URL + "/user/requests/received", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      dispatch(addRequest(data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl text-white font-bold">Connection Request</h1>
      {requests.map((connection) => {
        return (
          <div
            className="flex m-4 p-4 bg-base-300 rounded-lg w-2/3 mx-auto"
            key={connection.fromUserId._id}
          >
            <div>
              <img
                src={connection.fromUserId.photoUrl}
                style={{ width: "80px", height: "80px" }}
                alt={connection.fromUserId.firstName}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold">
                {connection.fromUserId.firstName}{" "}
                {connection.fromUserId.lastName}
              </h2>
              <p>{connection.fromUserId.age} years old</p>
              <p>{connection.fromUserId.about}</p>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",connection._id)}>Reject</button>
              <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted",connection._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
