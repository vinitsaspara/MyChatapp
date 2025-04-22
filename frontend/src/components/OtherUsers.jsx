import React from "react";
import OtherUser from "./otherUser";
import useGetOtherUser from "../hooks/useGetOtherUser.js";

function OtherUsers({ users }) {

  useGetOtherUser();

  if (!users?.length) {
    return <p className="text-center text-slate-400">No users found</p>;
  }

  return (
    <div className="overflow-auto flex-1">
      {users.map((user) => (
        <OtherUser key={user?._id} user={user} />
      ))}
    </div>
  );
}

export default OtherUsers;
