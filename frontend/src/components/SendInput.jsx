import axios from "axios";
import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function SendInput() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message); // this is an object with messages: []

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const newMsg = res?.data?.newMessage;

      dispatch(
        setMessages({
          ...messages,
          messages: [...messages.messages, newMsg] // ✅ append new message correctly
        })
      );

      setMessage("");
    } catch (error) {
      console.log("Send Error:", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3 text-black">
      <div className="w-full flex items-center relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="send msg..."
          className="border text-sm p-2 border-zinc-500 rounded-sm block w-full bg-gray-300"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-1 items-center hover:bg-white rounded-sm p-1 cursor-pointer"
        >
          <MdSend />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
