import React from 'react'
import {GoogleAuthProvider, getAuth,signInWithPopup} from "firebase/auth"
import { app } from './firebase';
import { signInSuccess } from '../redux/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickHandler = async ()=>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);
            
            const res = await fetch("/api/auth/google",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            }) 
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate("/");
            

        }
        catch(error){
            console.log("could not sign in with google ",error);
        }
    }
  return (
    <div>
        <button onClick={clickHandler} type='button'>Continue with google</button>
    </div>
  )
}

export default OAuth