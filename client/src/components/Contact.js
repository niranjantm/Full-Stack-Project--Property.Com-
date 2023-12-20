import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function Contact({listing}) {
    const [landlordInfo,setLandlordInfo] = useState("")
    const [message,setMessage] = useState("")
    console.log(listing.userRef);
    
    useEffect(()=>{
        console.log("Use effect")
        const fetchLandLordContact = async ()=>{
            try{
            const res = await fetch(`/api/users/${listing.userRef}`,{
                method:"GET"
            });
            const data = await res.json();
            console.log(data.username);
            setLandlordInfo(data);
        }catch(error){
            console.log(error);
        }
        }
        fetchLandLordContact();
        
        }
    ,[listing.userRef])

    const handleMessage = (e)=>{
        setMessage(e.target.value)
    } 

  return (
    <div className='flex flex-col justify-center w-[75%] gap-3'>
        <div className='flex gap-1 '>
        <span className='text-sm'>Contact</span>
        <span className='text-sm font-semibold'>{landlordInfo.username}</span>
        <span className='text-sm'>about</span>
        <span className='text-sm font-semibold'>{listing.name}</span>
        </div>
  
        <textarea className=" rounded-lg bg-slate-300 placeholder-slate-500 border border-gray-800 p-2"placeholder='Enter your message here' rows={3} value={message} onChange={handleMessage}>

        </textarea>
        <div className='flex justify-center'>
        <Link className='  bg-blue-800 rounded-lg p-3 border border-gray-800 text-center text-white hover:opacity-90 w-fit'to={`mailto:${landlordInfo.email}?subject=Regarding ${listing.name}&body=${message}`}>Send Message</Link>
        </div>
           </div>
    
    
  )
}

export default Contact