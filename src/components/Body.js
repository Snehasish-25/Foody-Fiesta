// 

import ResCard, { withlabel } from "./ResCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { RES_API } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserOnline from "./UserOnline";
import { useSelector } from "react-redux";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const ResDiscounted = withlabel(ResCard);

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_API);
    const jsonData = await data.json();

    const restaurants =
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    setRestaurantList(restaurants);
    setFilteredResList(restaurants);
  };

  const userStatus = useOnline();

  if (!userStatus) return <UserOnline />;

  if (restaurantList.length === 0) {
    return <Shimmer />;
  }

  const handleSearch = () => {
    const filteredRes = restaurantList.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResList(filteredRes);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleFilter = () => {
    const filteredData = restaurantList.filter(
      (res) => res.info.avgRating > 4.2
    );
    setFilteredResList(filteredData);
  };

const isPresent=(obj)=>
{
  const key='aggregatedDiscountInfoV3';
  if(obj.hasOwnProperty(key))
    return true; 
  else
  return false;

}


  return (
    <div className="body">
      <div className="features">
        <div className="search-bar">
          <input
            type="text"
            className="search-box"
            placeholder="Search restaurant"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="filter">
          <button className="filter-btn" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>

      <div className="res-container">
        {filteredResList.map((restaurant) => {
          //console.log(typeof(restaurant.info.aggregatedDiscountInfoV2))
          const present = isPresent(restaurant.info);  //true means present
          console.log(present);

          return (
            <Link
              to={"/restaurants/" + restaurant.info.id}
              key={restaurant.info.id}
              className="restaurant-link"
            >
              {present ? (
                <ResDiscounted resData={restaurant} />
               
              ) : (
                <ResCard resData={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
