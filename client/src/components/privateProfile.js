import React from 'react'
import { Outlet,Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";

function PrivateProfile() {
    const user = useSelector(state=>state.user);
  return user.currentUser?<div><Outlet/></div>:<Navigate to={"sign-in"}></Navigate>
    
   
}

export default PrivateProfile