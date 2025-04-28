import axios from "axios";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ImSearch } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";
import OtherUsers from "./OtherUsers";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((store) => store.user);
  const [search, setSearch] = useState("");

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`, {
        withCredentials: true,
      });
      navigate("/login");
      // dispatch(setSelectedUser(null));
      dispatch(setAuthUser(null));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // useMemo for performance optimization
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return otherUsers;
    const filtered = otherUsers?.filter((user) =>
      user?.fullName.toLowerCase().includes(search.toLowerCase())
    );
    return filtered;
  }, [search, otherUsers]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!filteredUsers.length) {
      toast.error("User not found !!!");
    }
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input rounded-lg outline-none border-none focus:outline-none focus:border-none hover:outline-none hover:border-none shadow-none"
          type="text"
          name="search"
          placeholder="Search..."
        />
        <button type="submit" className="btn btn-circle bg-slate-500">
          <ImSearch className="outline-none border-none" />
        </button>
      </form>

      <div className="divider px-3"></div>

      {/* Send filtered users to OtherUsers */}
      <OtherUsers users={filteredUsers} />

      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
