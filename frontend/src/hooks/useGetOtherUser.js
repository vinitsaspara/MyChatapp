import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch} from "react-redux"
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUser() {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUsers = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/user/`,{
                    withCredentials:true
                }) || [];
                // console.log(res.data);
                
                if(res.data.success){
                    dispatch(setOtherUsers(res.data.otherUsers));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchOtherUsers();
    },[])

}

export default useGetOtherUser