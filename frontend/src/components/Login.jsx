import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";


function Login() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/login`,user,{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true
      })
      

      if(res.data.success){
        dispatch(setAuthUser(res?.data));
        navigate("/");
        toast.success(`welcome back ${res.data.fullName}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setUser({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="p-3 h-full w-full bg-white-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-500">
          Login
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="lable p-2">
              <span className="text-base lable-text">Username</span>
            </label>
            <input
              type="text"
              className="w-full px-2 border-gray-100 h-10"
              name=""
              placeholder="Username"
              value={user.userName}
              onChange={(e)=>setUser({...user,userName:e.target.value})}
            />
          </div>
          <div>
            <label className="lable p-2">
              <span className="text-base lable-text">Password</span>
            </label>
            <input
              type="password"
              className="w-full px-2 border-gray-100 h-10"
              name=""
              placeholder="Password"
              id=""
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-soft btn-info w-full mt-4">Login</button>
          </div>
          <div>
            <Link to="/register">
              <p className="text-blue-400 text-sm mt-2">
                Don't have an account ? Signup
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
