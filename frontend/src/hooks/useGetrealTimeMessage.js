import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetrealTimeMessage = () => { const dispatch = useDispatch();
    const { socket } = useSelector((store) => store.socket);
    const { messages } = useSelector((store) => store.message || { messages: [] });
    const { selectedUser } = useSelector((store) => store.user);
  
    useEffect(() => {
      if (!socket) return;
  
      socket.on("newMessage", (newMsg) => {
        // ✅ Ensure selectedUser and messages are valid
        if (newMsg.senderId === selectedUser?._id && Array.isArray(messages?.messages)) {
          dispatch(
            setMessages({
              messages: [...messages.messages, newMsg],
            })
          );
        }
      });
  
      return () => socket.off("newMessage");
    }, [socket, messages, selectedUser, dispatch]);
}

export default useGetrealTimeMessage;