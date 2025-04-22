// App.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Homepage";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: { userId: authUser._id },
        withCredentials: true,
      });

      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socket.disconnect();
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
