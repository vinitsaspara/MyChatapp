import React from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import SendInput from "./SendInput";

function MessageContainer() {
  const {selectedUser,onlineUsers} = useSelector(store=>store.user);
  
    const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="md:min-w-[440px] flex flex-col">
      <div className="flex gap-2 items-center bg-zinc-800 px-4 py-2 mb-2">
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePhoto}
              alt="user"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex  gap-2 ">
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      <Messages/>
      <SendInput/>
    </div>
  );
}

export default MessageContainer;
