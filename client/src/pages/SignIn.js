import React,{useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import { signInFailure,signInStart,signInSuccess } from "../redux/userReducer";
import {useSelector,useDispatch} from "react-redux";
import OAuth from "../components/OAuth";


function SignIn() {
  const [formData,setFormData] = useState({});
  // const [error,setError] = useState(null);
  // const [loading,setLoading] = useState(false);
  const navigate  = useNavigate();
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const onchangeHandler=(event)=>{
    
    setFormData({
      ...formData,
      [event.target.id]:event.target.value
    }
    )
    console.log(formData)
  }

  const submitHandler= async (event)=>{
    event.preventDefault();
    dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json();
      console.log(data)
      if(data.success==false){
        dispatch(signInFailure(data.errorMessage))
      }
      else{
        dispatch(signInSuccess(data));
        navigate("/profile")
      }
      
    }
    
  

  return (
    <div className="">
      <p className="text-3xl font-semibold text-center p-8">Sign In</p>
      <div className="p-5 w-full">
        <form  onSubmit={submitHandler} className="bg-slate-200 gap-5 w-[500px] max-sm:w-[300px] p-5 rounded-lg shadow-lg mx-auto flex flex-col justify-center ">
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            className="bg-slate-300 rounded-lg border border-gray-600 focus:outline-none p-2"
            onChange={onchangeHandler}
          ></input>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="bg-slate-300 rounded-lg border border-gray-600 focus:outline-none p-2"
            onChange={onchangeHandler}
          ></input> 
          <p  hidden={!user.error} className="text-red-500 text-center">{user.error}</p>
          <button type="submit" className="border border-gray-600 rounded-lg bg-blue-600 p-2 text-white">{user.loading?"Loading":"Sign in"}</button>
          <button type="button" className="border border-gray-600 rounded-lg bg-red-600 p-2 text-white"><OAuth></OAuth></button>
        </form>
      </div>

      <div>
        <p className="text-center">
          new user{" "}
          <Link to={"/sign-up"} className="text-red-500">
            {" "}
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
