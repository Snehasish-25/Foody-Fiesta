
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { STAR_ICON} from "../utils/constants";
import ItemCard from "./ItemCard";
import { useParams } from "react-router-dom";
import MenuShimmer from "./MenuShimmer";
import useResMenu from "../utils/useResMenu";
import RestaurantCategory from "./RestaurantCategory";

const ResMenu = () => {
    const [ResInfo, setResInfo] = useState(null); //ResInfo ka use hogaa upar ka restaurant card design karne me 
    const [itemCards, setItemCards] = useState([]); //ItemCards ka data hi actually menu ko show karega
    const {resId}=useParams();

    const [showIndex,setShowIndex]=useState(null);

    const val = useResMenu(resId);  //CUSTOM HOOK
    useEffect(() => {
        if (val) {
            setResInfo(val);
            const items = val?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];
            setItemCards(items);
        }
    }, [val]);

    if (!ResInfo) {
        return <MenuShimmer />;
    }

    const { name, locality, costForTwoMessage, cuisines, avgRatingString, totalRatingsString, feeDetails, sla } = ResInfo?.data?.cards[2]?.card?.card?.info || {};

    const categories=ResInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>c?.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
   // console.log(categories.length);
    return (
        <div className="resMenu">

            <div className="res-card-info" >
                <h1 className="res-name">{name}</h1>

          
                  <div className="res-details">
                    <div className="rat-price">
                        <img className="star-icon" src={STAR_ICON} alt="Star icon" />
                        <div className="avg-rat">{avgRatingString}</div>
                        <div className="cus-rat">({totalRatingsString})</div>
                        <div className="price-two">{costForTwoMessage}</div>
                    </div>
                    <div className="res-cui">{cuisines?.join(", ")}</div>
                    <div className="loc-time">{locality} | {sla?.slaString}</div>
                    <div className="dist-fee">{sla?.lastMileTravelString} | ₹{feeDetails?.totalFee / 100 || 0} Delivery fee will apply</div>
                  </div>

                
            </div>
            
            <div className="menu">
                {categories.map((category,index)=> (
                    <RestaurantCategory 
                    key={index} 
                    category={category?.card?.card}
                    showItems={ index===showIndex ? true:false}  //controlled component
                    setShowIndex={()=>setShowIndex(index)}
                    />     
                ))
                };
            </div>
        </div>
    );
};

export default ResMenu;

