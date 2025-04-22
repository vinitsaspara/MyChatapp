import React from 'react';
import SingleMessage from './SingleMessage';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetrealTimeMessage from '../hooks/useGetrealTimeMessage';

function Messages() {
  useGetrealTimeMessage();
  useGetMessages();

  const { messages } = useSelector((store) => store.message);

  const allMessages = messages?.messages;

  if (!allMessages || allMessages.length === 0) {
    return (
      <div className='flex items-center justify-center h-full text-white'>
        No Conversation
      </div>
    );
  }

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {
        allMessages.map((message) => (
          <SingleMessage key={message?._id} message={message} />
        ))
      }
    </div>
  );
}

export default Messages;
