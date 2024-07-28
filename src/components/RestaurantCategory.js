import { useState } from "react";
import ItemCard from "./ItemCard";

const RestaurantCategory=({category,showItems,setShowIndex})=>{
   
    const itemarray=category.itemCards;
   // console.log(category.category.itemCards)

    const handleClick=()=>{
        setShowIndex();  //eventhandler which is passed as a prop
    }
  return (
    <div className="res-banner">
       <div className="res-title" onClick={handleClick}>
        <span>{category.title} ({category.itemCards.length})</span>
        <span>▼</span>
       </div>
       { showItems && itemarray.map((item)=><ItemCard key ={item.card.info.id} itemData={item}/>)}
       </div>
  )
}
export default RestaurantCategory;

