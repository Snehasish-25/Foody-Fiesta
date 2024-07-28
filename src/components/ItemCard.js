import { useDispatch, useSelector } from "react-redux";
import { STAR_ICON1 } from "../utils/constants";
import { addItem, decreaseItemQuantity } from "../cartStore/cartSlice";

const ItemCard = ({itemData}) => {

 
  const { name, description, id, imageId, defaultPrice, finalPrice, ratings,price } =
    itemData?.card?.info;


    //Aage chal ke implement karenge isko
         // const cartItems=useSelector((store)=>store.cart.items)
     //cartItems.length !==0 ? console.log("Your cart contains items from different Restaurant") :

     const dispatch=useDispatch();
    

    const handleAddItem=(itemData)=>{
     
        dispatch(addItem(itemData));
    }
    const handleMinusItem = (itemId) => {
      dispatch(decreaseItemQuantity(itemId));
  };

  return (
    <div className="outer-container">
      <div className="item-card">

        <div className="item-desc">
          <div className="item-name">{name}</div>
          <div className="item-price">
            ₹ {finalPrice / 100 || defaultPrice / 100  || price/100}
          </div>
          <div className="rat-contain">
            <img className="rat-icon" src={STAR_ICON1}></img>
            <div className="ratings">{ratings.aggregatedRating.rating || 4.1}</div>
          </div>
          <div className="item-description">{description}</div>
        </div>
        
        <div className="item-img">
          <img
            className="item-pic"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +imageId
            }
          ></img>
          <div className="add-btn-container">
            <div className="minus" onClick={()=>handleMinusItem(id)} >-</div>
            <div className="add-name">ADD</div>
            <div className="add" onClick={()=>handleAddItem(itemData)}>+</div>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
};
export default ItemCard;
