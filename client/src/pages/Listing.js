import {useEffect, useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import Carousel from "react-material-ui-carousel"
import ClipLoader from "react-spinners/ClipLoader"
import {FaLocationDot as Location} from "react-icons/fa6"
import {IoBed as Bed} from "react-icons/io5"
import {FaBath as Bath} from 'react-icons/fa'
import {FaParking as Parking} from 'react-icons/fa'
import {FaChair as Furnished} from 'react-icons/fa'
import Contact from '../components/Contact';
import {useSelector} from "react-redux";
function Listing() {
    
    const params = useParams();
    const [listing,setListing] = useState("");
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [contact,setContact] = useState(false);
    const {currentUser} = useSelector(state=>state.user);
    console.log(listing)
    
    useEffect(()=>{
        setError(false);
        setLoading(true);
        
        const fetchListing = async ()=>{
            
           try{
            const res = await fetch(`/api/listing/get/${params.listingId}`,{
                method:"GET"
            })
            const data = await res.json();
            
            if(data.success===false){
                setError(true)
            }else{
                setError(false);
                setLoading(false);
                setListing(data);
             
            }
           }catch(error){
            setError(true);
            setLoading(false);
            console.log(error);
           }
        }
        fetchListing();

    },[])
    
    const handleContact=()=>{
        setContact(true)
    }
   
  return (
    <div>
        {loading && <div className='flex justify-center items-center min-h-[500px] '><ClipLoader color="#1fc600"></ClipLoader></div> }
        {error && (<p className='text-center text-lg my-10'>Something went wrong !</p>)}
            
         { !loading && !error && listing && (
         <div>
            <Carousel>
                {!listing?"":listing.imageUrl.map((url)=>{
                    return(
                    
                        <div key={url} className="">  
                        <img src={url} className='object-fill h-[500px] w-full max-sm:h-[300px]'></img> 
                        </div>
                   
                )})}
            </Carousel>

            <div className='p-5 flex flex-col gap-8 max-sm:gap-4 '>
                <div className='flex flex-wrap'>
                    <span className='text-xl font-semibold'>{listing.name} - </span>
                    <span className='text-xl font-semibold'>INR {listing.regularprice}{listing.type==="rent"?" / month":""}</span>
                </div>
                <div className='flex gap-2 flex-wrap'>
                    <Location className='text-green-500 mt-1.5 max-sm:m-0'></Location>
                    <span className="text-lg max-sm:text-sm">{listing.address}</span>
                </div>
                <div className='flex gap-4 flex-wrap max-sm:flex-col max-sm:items-center'>
                    <span className=' bg-red-900 text-white rounded-lg text-center w-60 p-1 uppercase my-auto'>{"For "}{listing.type}</span>
                    {listing.offer?<span className=' bg-green-800 text-white rounded-lg text-center w-60 p-1 px-2 '>INR {listing.discountedprice} discount</span>:<span className='border bg-green-800 text-white rounded-lg text-center w-60 p-1 px-2 '>No Offers right now</span>}
                </div>
                <div>
                    <span className='font-semibold text-lg max-sm:text-sm'>Description -{" "}</span>
                    <span className='font-light text-lg max-sm:text-sm'>{listing.description}</span>
                </div>
                <div className='flex gap-5 flex-wrap justify-center'>
                    <span className='flex gap-2'><Bed className='text-green-600 mt-1.5 max-sm:m-0'></Bed>{listing.bedrooms}{listing.bedrooms>1?" Bedrooms":" Bedroom"}</span>
                    <span className='flex gap-2'><Bath className='text-green-600 mt-1.5 max-sm:m-0'></Bath>{listing.bathrooms}{listing.bathrooms>1?" Bathrooms":" Bathroom"}</span>
                    <span className='flex gap-2'><Parking className={listing.parking?'text-green-600 mt-1.5 max-sm:m-0':'text-red-600 mt-1.5 max-sm:m-0'}></Parking>{listing.parking?"Parking spot":"No Parking"}</span>
                    <span className='flex gap-2'><Furnished className={listing.furnished?'text-green-600 mt-1.5 max-sm:m-0':'text-red-600 mt-1.5 max-sm:m-0'}></Furnished>{listing.furnished?"Furnished":"Not Furnished"}</span>
                </div>
            </div>
            
            {!currentUser?<div className='flex justify-center p-3'><Link to={"/sign-in"} className='text-white border border-gray-800 bg-blue-900 rounded-lg p-3'>Sign-in to contact landlord</Link></div>:(currentUser._id!==listing.userRef) && 
            (<div className='flex justify-center mb-5'>
            {!contact?<button className='text-white border border-gray-800 bg-blue-900 rounded-lg p-3' onClick={handleContact}>Contact landlord</button>:<Contact listing={listing}></Contact>}
            </div>)}
            </div>)}
            
    </div>
  )
}

export default Listing