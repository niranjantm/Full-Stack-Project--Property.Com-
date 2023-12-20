import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot as Location } from "react-icons/fa6";
import Carousel from "react-material-ui-carousel";
import ClipLoader from "react-spinners/ClipLoader"
function Home() {
  const navigate = useNavigate();
  const [recentListinigs, setRecentListings] = useState([]);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const images = [
    'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/681368/pexels-photo-681368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1587947/pexels-photo-1587947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3030330/pexels-photo-3030330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  useEffect(() => {
    try {
      setLoading(true);
      const fetchRecent = async () => {
        const urlParams = new URLSearchParams();
        const sort = "createdAt";
        const order = "desc";
        const limit = 6;
        urlParams.set("sort", sort);
        urlParams.set("order", order);
        urlParams.set("limit", limit);
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/get?${searchQuery}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.errorMessage);
        } else {
          setRecentListings(data);
          fetchOffers();
        }
      };
      // ------------------------------------FETCH OFFERS-------------------------------------------------//
      const fetchOffers = async () => {
        const urlParams = new URLSearchParams();
        const offer = true;
        const limit = 6;
        const sort = "createdAt";
        const order = "desc";
        urlParams.set("offer", offer);
        urlParams.set("limit", limit);
        urlParams.set("sort", sort);
        urlParams.set("order", order);
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/get?${searchQuery}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.errorMessage);
        } else {
          setOfferListings(data);
          fetchRent();
        }
      };
      //--------------------------------------------FETCH RENT------------------------------------------------//

      const fetchRent = async () => {
        const urlParams = new URLSearchParams();
        const type = "rent";
        const limit = 6;
        const sort = "createdAt";
        const order = "desc";
        urlParams.set("type", type);
        urlParams.set("limit", limit);
        urlParams.set("sort", sort);
        urlParams.set("order", order);
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/get?${searchQuery}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.errorMessage);
        } else {
          setRentListings(data);
          fetchSale();
        }
      };
      //-----------------------------------------FETCH SALE---------------------------------------------------

      const fetchSale = async () => {
        const urlParams = new URLSearchParams();
        const type = "sale";
        const limit = 6;
        const sort = "createdAt";
        const order = "desc";
        urlParams.set("type", type);
        urlParams.set("limit", limit);
        urlParams.set("sort", sort);
        urlParams.set("order", order);
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/get?${searchQuery}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          console.log(data.errorMessage);
        } else {
          setLoading(false);
          setSaleListings(data);
        }
      };

      fetchRecent();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <div className="h-[300px] max-sm:h-[200px] flex justify-center relative ">
      <Carousel className="w-full h-full relative">
        {images.map((item) => {
          console.log(item)
          return (
              <img className="w-[100%] h-full object-fill" src={item}></img> 
          );
        })}
        </Carousel>
        <div 
          onClick={() => {
            navigate("/search");
          }}
          className=" hover:cursor-pointer flex gap-2 w-[fit] sm:w-[800px] h-fit flex-wrap p-5 bg-slate-50  absolute z-10 rounded-lg  shadow-xl mx-5 -bottom-16 max-sm:-bottom-14 justify-center hover:scale-105 transition-all"
        >
          <p className="text-5xl max-sm:text-xl text-gray-800 font-semibold my-auto">
            Helping Millions To Find Their
          </p>
          <span className="text-5xl max-sm:text-xl text-gray-500 font-semibold my-auto">
            Ideal House
          </span>
          <span className="text-5xl max-sm:text-xl text-gray-800 font-semibold my-auto">
            {" "}
            With
          </span>
          <span className="text-5xl max-sm:text-xl text-red-600 font-semibold my-auto">
            property.Com
          </span>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------------------------- */}
      {loading ? (
        <div className="mt-24 sm:mt-26 flex justify-center items-center">
          <ClipLoader color="#1fc600"></ClipLoader>
        </div>
      ) : (
        <div className="mt-24 sm:mt-26 p-5 border-t flex flex-col gap-5">
          <div className="border shadow-xl rounded-lg">
            <p
              className="text-xl font-semibold p-3 w-fit "
            >
              Recent Listings
            </p>
            <p
              className="text-sm  px-3 pb-2 text-blue-600 hover:underline w-fit hover:cursor-pointer"
              onClick={() => {
                navigate("/search");
              }}
            >
              Show more...
            </p>
            <div className="flex gap-6 border-t flex-wrap p-3">
              {recentListinigs.map((item, index) => {
                return (
                  <div
                    className="w-[350px] h-fit border border-gray-300 rounded-lg shadow-lg mx-auto pb-4 hover:scale-95 transition-all"
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <img
                      src={item.imageUrl[0]}
                      className="w-full object-fill h-[150px] rounded-lg"
                    ></img>
                    <p className="text-lg text-center font-semibold">
                      {item.name}
                    </p>

                    <div className="flex gap-2 p-3">
                      <Location className="text-green-500 mt-1.5 max-sm:m-0"></Location>
                      <p className="text-sm">{item.address}</p>
                    </div>

                    <div className="flex gap-1 p-3">
                      <p className="text-sm font-semibold">
                        {item.type === "sale" ? "Sale" : "Rent"}
                      </p>
                      <span className="text-sm">
                        {" INR "}
                        {item.regularprice}
                      </span>
                      <span className="text-sm">
                        {item.type === "rent" ? "/month" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/*  ------------------------------------OFFERS LISTINGS---------------------------------------------------- */}
          <div className="border shadow-xl rounded-lg">
          <p
              className="text-xl font-semibold p-3 w-fit "
            >
              Recent Offers
            </p>
            <p
              className="text-sm  px-3 pb-2 text-blue-600 hover:underline w-fit hover:cursor-pointer"
              onClick={() => {
                navigate("/search?offer=true");
              }}
            >
              Show more...
            </p>
            <div className="flex gap-6 border-t flex-wrap p-3">
              {offerListings.map((item, index) => {
                return (
                  <div
                    className="w-[350px] h-fit border border-gray-300 rounded-lg shadow-lg mx-auto pb-4 hover:scale-95 transition-all"
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <img
                      src={item.imageUrl[0]}
                      className="w-full object-fill h-[150px] rounded-lg"
                    ></img>
                    <p className="text-lg text-center font-semibold">
                      {item.name}
                    </p>

                    <div className="flex gap-2 p-3">
                      <Location className="text-green-500 mt-1.5 max-sm:m-0"></Location>
                      <p className="text-sm">{item.address}</p>
                    </div>

                    <div className="flex gap-1 p-3">
                      <p className="text-sm font-semibold">
                        {item.type === "sale" ? "Sale" : "Rent"}
                      </p>
                      <span className="text-sm">
                        {" INR "}
                        {item.regularprice}
                      </span>
                      <span className="text-sm">
                        {item.type === "rent" ? "/month" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------------------------------------------------------RECENT RENT------------------------------- */}
          <div className="border shadow-xl rounded-lg">
          <p
              className="text-xl font-semibold p-3 w-fit "
            >
              For Rent
            </p>
            <p
              className="text-sm  px-3 pb-2 text-blue-600 hover:underline w-fit hover:cursor-pointer"
              onClick={() => {
                navigate("/search?type=rent");
              }}
            >
              Show more...
            </p>
            <div className="flex gap-6 border-t flex-wrap p-3">
              {rentListings.map((item, index) => {
                return (
                  <div
                    className="w-[350px] h-fit border border-gray-300 rounded-lg shadow-lg mx-auto pb-4 hover:scale-95 transition-all "
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <img
                      src={item.imageUrl[0]}
                      className="w-full object-fill h-[150px] rounded-lg"
                    ></img>
                    <p className="text-lg text-center font-semibold">
                      {item.name}
                    </p>

                    <div className="flex gap-2 p-3">
                      <Location className="text-green-500 mt-1.5 max-sm:m-0"></Location>
                      <p className="text-sm">{item.address}</p>
                    </div>

                    <div className="flex gap-1 p-3">
                      <p className="text-sm font-semibold">
                        {item.type === "sale" ? "Sale" : "Rent"}
                      </p>
                      <span className="text-sm">
                        {" INR "}
                        {item.regularprice}
                      </span>
                      <span className="text-sm">
                        {item.type === "rent" ? "/month" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -----------------------------------------------RECENT SALE--------------------------------------------- */}

          <div className="border shadow-xl rounded-lg">
          <p
              className="text-xl font-semibold p-3 w-fit "
            >
              For Sale
            </p>
            <p
              className="text-sm  px-3 pb-2 text-blue-600 hover:underline w-fit hover:cursor-pointer"
              onClick={() => {
                navigate("/search?type=sale");
              }}
            >
              Show more...
            </p>
            <div className="flex gap-6 border-t flex-wrap p-3">
              {saleListings.map((item, index) => {
                return (
                  <div
                    className="w-[350px] h-fit border border-gray-300 rounded-lg shadow-lg mx-auto pb-4 hover:scale-95 transition-all "
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <img
                      src={item.imageUrl[0]}
                      className="w-full object-fill h-[150px] rounded-lg"
                    ></img>
                    <p className="text-lg text-center font-semibold">
                      {item.name}
                    </p>

                    <div className="flex gap-2 p-3">
                      <Location className="text-green-500 mt-1.5 max-sm:m-0"></Location>
                      <p className="text-sm">{item.address}</p>
                    </div>

                    <div className="flex gap-1 p-3">
                      <p className="text-sm font-semibold">
                        {item.type === "sale" ? "Sale" : "Rent"}
                      </p>
                      <span className="text-sm">
                        {" INR "}
                        {item.regularprice}
                      </span>
                      <span className="text-sm">
                        {item.type === "rent" ? "/month" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;