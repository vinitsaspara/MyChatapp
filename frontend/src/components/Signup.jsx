import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

function Signup() {
  
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender: gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        user,
        {
          header: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="p-3 h-full w-full bg-white-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-3 text-indigo-400">
          Signup
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="lable p-2">
              <span className="text-base lable-text">FullName</span>
            </label>
            <input
              type="text"
              className="w-full border-gray-100 h-10"
              name=""
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              placeholder="Fullname"
              id=""
            />
          </div>
          <div>
            <label className="lable p-2">
              <span className="text-base lable-text">Username</span>
            </label>
            <input
              type="text"
              className="w-full border-gray-100 h-10"
              name=""
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              placeholder="Username"
            />
          </div>
          <div>
            <label className="lable p-2">
              <span className="text-base lable-text">Password</span>
            </label>
            <input
              type="password"
              className="w-full border-gray-100 h-10"
              name=""
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              id=""
            />
          </div>
          <div>
            <label className="lable p-2">
              <span className="text-base lable-text">Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full border-gray-100 h-10"
              name=""
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              placeholder="Confirm password"
              id=""
            />
          </div>
          <div className="flex items-center my-2 gap-2">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                className="checkbox mx-1 border-gray-600 bg-gray-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 "
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                className="checkbox mx-1 border-gray-600 bg-gray-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 "
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-soft btn-info w-full my-2">
              Signup
            </button>
          </div>
          <div>
            <Link to="/login">
              <p className="text-blue-400 text-sm">
                Alredy have an account ? login
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
