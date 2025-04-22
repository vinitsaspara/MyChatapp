import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

function useGetMessages() {

    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`, {
                    withCredentials: true
                });
                // console.log(res);
                dispatch(setMessages(res.data))

            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser]);

}

export default useGetMessages