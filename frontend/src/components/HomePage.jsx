import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

function Homepage() {
  const { selectedUser } = useSelector((store) => store.user);
  

  return (
    <div className='flex sm:h-[340px] md:h-[450px] rounded-lg overflow-hidden bg-gray-400/30 backdrop-blur-lg bg-clip-padding'>
      <Sidebar />
      {
        selectedUser ? (
          <MessageContainer />
        ) : (
          <p className='text-center text-white w-full flex items-center justify-center'>
            Please select a user to view messages.
          </p>
        )
      }
    </div>
  );
}

export default Homepage;
