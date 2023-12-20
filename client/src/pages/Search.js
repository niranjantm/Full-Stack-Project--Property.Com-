import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { FaLocationDot as Location } from "react-icons/fa6";

function Search() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sideBar, setSideBar] = useState({
    type: "all",
    parking: false,
    offer: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
    searchTerm: "",
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    const typeFormUrl = urlParams.get("type");
    const parkingFormUrl = urlParams.get("parking");
    const offerFormUrl = urlParams.get("offer");
    const furnishedFormUrl = urlParams.get("furnished");
    const sortFormUrl = urlParams.get("sort");
    const orderFormUrl = urlParams.get("order");

    if (
      searchTermFormUrl ||
      typeFormUrl ||
      parkingFormUrl ||
      offerFormUrl ||
      furnishedFormUrl ||
      sortFormUrl ||
      orderFormUrl
    ) {
      setSideBar({
        searchTerm: searchTermFormUrl || "",
        type: typeFormUrl || "all",
        parking: parkingFormUrl === "true" ? true : false,
        offer: offerFormUrl === "true" ? true : false,
        furnished: furnishedFormUrl === "true" ? true : false,
        sort: sortFormUrl || "createdAt",
        order: orderFormUrl || "desc",
      });
    }

    try {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const fetchSearchListings = async () => {
        const res = await fetch(`/api/listing/get?${searchQuery}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          console.log(data.errorMessage);
        } else {
          setLoading(false);
          setListings(data);

          if (listings.length >= 8) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
      fetchSearchListings();
    } catch (error) {
      console.log(error);
    }
  }, [window.location.search]);

  const handleChange = (e) => {
    if (e.target.id === "type") {
      setSideBar((pre) => {
        return { ...pre, [e.target.id]: e.target.value };
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "offer" ||
      e.target.id === "furnished"
    ) {
      setSideBar((pre) => {
        return {
          ...pre,
          [e.target.id]:
            e.target.checked || e.target.checked === "true" ? true : false,
        };
      });
    }
    if (e.target.id === "sort_order") {
      setSideBar((pre) => {
        return {
          ...pre,
          sort: e.target.value.split("_")[0],
          order: e.target.value.split("_")[1],
        };
      });
    }
    if (e.target.id === "searchTerm") {
      setSideBar((pre) => {
        return { ...pre, [e.target.id]: e.target.value };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBar.searchTerm);
    urlParams.set("type", sideBar.type);
    urlParams.set("parking", sideBar.parking);
    urlParams.set("furnished", sideBar.furnished);
    urlParams.set("offer", sideBar.offer);
    urlParams.set("sort", sideBar.sort);
    urlParams.set("order", sideBar.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const showListing = (listingId) => {
    navigate(`/listing/${listingId}`);
  };

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const startIndex = listings.length;
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    const fetchMoreListings = await fetch(`/api/listing/get?${searchQuery}`, {
      method: "GET",
    });
    const data = await fetchMoreListings.json();
    if (data.success === false) {
      console.log(data.errorMessage);
    } else {
      if (data.length >= 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings([...listings, ...data]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row ">
      {/* ------------------------------CONDITIONS------------------------------ */}
      
      <form
        onSubmit={handleSubmit}
        className=" p-3 w-fit h-screen flex flex-col gap-6 max-md:h-fit max-md:w-screen max-sm:h-fit max-sm:w-screen"
      >
        <div className="flex gap-2 items-center">
          <span className="text-sm">Search:</span>
          <input
            id="searchTerm"
            value={sideBar.searchTerm}
            className="bg-slate-300 placeholder-slate-500 rounded-lg border border-gray-600 focus:outline-none p-2"
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex gap-2">
          <span className="text-sm">Type:</span>
          <input
            type="checkbox"
            className="w-6 h-6 "
            defaultChecked={true}
            checked={sideBar.type === "all"}
            id="type"
            value="all"
            onChange={handleChange}
          ></input>
          <span className="text-sm">Sale & Rent</span>

          <input
            type="checkbox"
            className="w-6 h-6 "
            id="type"
            value="sale"
            onChange={handleChange}
            checked={sideBar.type === "sale"}
          ></input>
          <span className="text-sm">Sale</span>

          <input
            type="checkbox"
            className="w-6 h-6 "
            id="type"
            value="rent"
            onChange={handleChange}
            checked={sideBar.type === "rent"}
          ></input>
          <span className="text-sm">Rent</span>

          <input
            type="checkbox"
            className="w-6 h-6 "
            id="offer"
            onChange={handleChange}
            checked={sideBar.offer}
          ></input>
          <span className="text-sm">Offer</span>
        </div>

        <div className="flex gap-2">
          <span className="text-sm">Amenities:</span>
          <input
            type="checkbox"
            className="w-6 h-6 "
            id="parking"
            onChange={handleChange}
            checked={sideBar.parking}
          ></input>
          <span className="text-sm">Parking</span>
          <input
            type="checkbox"
            className="w-6 h-6"
            id="furnished"
            onChange={handleChange}
            checked={sideBar.furnished}
          ></input>
          <span className="text-sm">Furnished</span>
        </div>

        <div className="flex gap-2">
          <span className="text-sm">Sort:</span>
          <select
            onChange={handleChange}
            id="sort_order"
            defaultValue="createdAt_desc"
            className="w-26   text-lg bg-slate-300 placeholder-slate-500 rounded-lg border border-gray-600 focus:outline-none p-2"
          >
            <option value="createdAt_desc">Latest</option>
            <option value="regularprice_desc">Price high to low</option>
            <option value="regularprice_asc">Price low to high</option>
            <option value="createdAt_asc">Oldest</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="uppercase w-full p-3 bg-blue-700 rounded-lg disabled:opacity-80 text-white shadow-md hover:opacity-90"
          >
            Search
          </button>
        </div>
      </form>
      

      {/* --------------------------------RESULTS-------------------------------- */}
      <div className="w-full">
        <p className="text-3xl font-semibold text-gray-700 border-b  p-3">
          Listing Results
        </p>
        {loading && (
          <div className="flex justify-center p-5">
            <ClipLoader color="#1fc600"></ClipLoader>
          </div>
        )}

        {loading ? (
          ""
        ) : (
          <div className="flex flex-wrap gap-4 p-2 ">
            {listings.length === 0
              ? "Listings not available"
              : listings.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-lg border flex flex-col shadow-xl w-[350px] max-md:w-[250px] mx-auto hover:scale-95 hover:shadow-none hover:cursor-pointer transition-all"
                      onClick={() => {
                        showListing(item._id);
                      }}
                    >
                      <img
                        src={item.imageUrl[0]}
                        className="w-full object-fill rounded-lg h-[200px]"
                      ></img>

                      <div className="p-2">
                        <p className="text-lg font-semibold text-center">
                          {item.name}
                        </p>
                      </div>

                      <div className="flex gap-2 p-2">
                        <Location className="text-green-500 mt-1.5 max-sm:m-0"></Location>
                        <p className="text-sm">{item.address}</p>
                      </div>

                      <div className="p-2">
                        <p className="text-sm line-clamp-2 ">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex p-2 flex-wrap justify-center">
                        <p className="text-lg text-gray-800">
                          {item.offer
                            ? `At discounted price of INR ${item.discountedprice} `
                            : `INR ${item.regularprice}`}
                        </p>
                        <span
                          hidden={item.type === "sale"}
                          className="text-lg text-gray-800"
                        >
                          {" "}
                          / month
                        </span>
                      </div>

                      <div className="flex gap-3 p-2">
                        <span className="font-semibold">
                          {item.bedrooms > 1 ? "Beds " : "Bed "}
                          {item.bedrooms}
                        </span>
                        <span className="font-semibold">
                          {item.bathrooms > 1 ? "Baths " : "Bath "}
                          {item.bathrooms}
                        </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        )}
        {showMore && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleShowMore}
              className="hover:underline text-lg text-green-600 p-2"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
