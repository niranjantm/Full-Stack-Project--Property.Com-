import React, { Fragment, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
//Using NavLink to change the route and to highlight the current route
//Using Outlet to accsses the child elements 
import { FaSearch } from "react-icons/fa";
import {useSelector} from "react-redux"
import { useState } from "react";

function MainNav() {
const [searchTerm,setSearchTerm] = useState("")
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm",searchTerm);
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  
  useEffect(()=>{

    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    if(searchTermFormUrl){
      setSearchTerm(searchTermFormUrl)
    }
  },[window.location.search])


  return (
    <Fragment>
      <header className="p-6  bg-gradient-to-r from-cyan-300 to-blue-300 shadow-lg sm:p-3  ">
       
        <div className="flex justify-evenly max-w-full gap-2 sm:gap-5 ">
          
          <div className="flex items-center">
            <span>
              <NavLink
                className="text-3xl max-sm:text-lg font-mono font-semibold text-red-500"
                to={"/"}
              >
                property
              </NavLink>
            </span>
            <span>
              <NavLink
                className="text-3xl max-sm:text-lg font-mono font-semibold text-gray-700"
                to={"/"}
              >
                .Com
              </NavLink>
            </span>
          </div>
         
          <form onSubmit={handleSubmit} className="bg-stone-100 rounded-lg flex items-center p-2 max-sm:w-[170px] max-sm:max-h-[50px] ">
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
              className=" bg-transparent p-2 border border-transparent max-sm:max-w-[75%] w-[300px] focus:outline-none "
            ></input>
            <button type="submit" className="max-sm:max-w-[25%]">
              <FaSearch className="text-stone-600 ml-2 hover:text-red-500 "></FaSearch>
            </button>
          </form>
          
          <ul className=" min-w-fit flex gap-5">
            <li className=" max-sm:hidden items-center flex hover:underline underline-offset-2">
              <NavLink
                to={"/"}
                className={({ isActive }) => {
                  return isActive ? "text-red-500" : "";
                }}
              >
                Home
              </NavLink>
            </li>
            <li className=" max-sm:hidden items-center flex hover:underline underline-offset-2">
              <NavLink
                to={"About"}
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                About
              </NavLink>
            </li>
            <li className="  items-center flex hover:underline underline-offset-2 ">
                {user.currentUser?<NavLink to={"profile"}>
                  <img src={user.currentUser.photo} alt="profile pic" className="h-10 w-10 rounded-full object-cover"></img>
                </NavLink>:
              <NavLink
                to={"sign-in"}
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                Sign-in
              </NavLink>
                }
            </li>
          </ul>
       
        </div>
      
      </header>
      <Outlet></Outlet>
    </Fragment>
  );
}

export default MainNav;