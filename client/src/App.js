import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
// Using createBrowserRouter,RouterProvider to create routes
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import MainNav from './components/MainNav';
import PrivateProfile from './components/privateProfile';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';


function App() {
  const router = createBrowserRouter([
    {path:"/",element:<MainNav></MainNav>,children:[
    {index:true,element:<Home></Home>},
    {path:"/about",element:<About></About>},
    {path:"/sign-in",element:<SignIn></SignIn>},
    {path:"/sign-up",element:<SignUp></SignUp>},
    {path:"/listing/:listingId",element:<Listing></Listing>},
    {path:"/search",element:<Search></Search>},
    {element:<PrivateProfile></PrivateProfile>,children:[
      {path:"/profile",element:<Profile></Profile>},
      {path:"/create-listing",element:<CreateListing></CreateListing>},
      {path:"/updateListing/:listingId",element:<UpdateListing></UpdateListing>}
    ]},
    ,
    ]},
    
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App