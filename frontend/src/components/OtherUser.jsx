import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    // console.log(user);
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={` ${
          selectedUser?._id === user?._id ? "bg-zinc-600" : ""
        } flex gap-2 items-center hover:bg-zinc-600 cursor-pointer rounded-sm p-1`}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherUser;
