import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";



const aggregateCartItems = (items) => {

    const itemMap = items.reduce((acc, item) => {
        if (acc[item?.card?.info?.id]) {
            acc[item?.card?.info?.id].quantity += 1 ; // Ensure quantity is a number
        } 
        else {
            //In case of first entry of any item
            acc[item?.card?.info?.id] = { ...item, quantity: 1 }; // Initialize quantity
        }
        return acc;
    }, {});
    return Object.values(itemMap);
};

const Cart=()=>{
    const cartItems=useSelector((store)=>store.cart.items);
    const aggregatedItems = aggregateCartItems(cartItems);
    const [GrandTotal,setGrandTotal]=useState(0);
    console.log(aggregatedItems);

    useEffect(() => {
        // Calculate grand total when aggregatedItems change
        let total = 0;
        aggregatedItems.forEach((item) => {
            const { finalPrice, defaultPrice, price } = item?.card?.info;
            const quant = item.quantity;
            const totAmt = ((finalPrice || defaultPrice || price) / 100) * quant;
            total += totAmt;
        });
        setGrandTotal(total);
    }, [aggregatedItems]); // Run this effect whenever aggregatedItems changes


    console.log(cartItems);
    console.log(aggregatedItems);

  if(cartItems.length===0)
  {
    return (
        <div className="cart-page">
            <div className="cart-wrapper">
                <img className="cart-empty-img" src="https://savour-bite.vercel.app/assets/add-to-cart-DFuWRHj1.png"></img>
                <h1 className="empty-title">Your cart is empty</h1>
                <h3 className="empty-msg">Looks like you have not added anything to your cart. Go ahead & explore items in menu.</h3>
                <Link to="/"  className="link-no-underline"><button className="empty-btn">Add items</button></Link>
            </div>
        </div>
    )
  }

return(
    <div className="cart-page">
      <div className="cart-wrapper">
            <div className="cart-title">Your Cart</div>
            <div className="bill-card">

                <div className="bill-title">Bill Details</div>
                <div className="item-billing">
                {
                    aggregatedItems.map((item)=>{

                        const {name,price,defaultPrice,finalPrice}=item?.card?.info;
                        const quant=item.quantity;
                        const totAmt=(finalPrice/100 || defaultPrice/100 || price/100)*quant;

                    return (
                        <div className="item-bill">
                             <div className="part-left">{name} × {quant}</div>
                             <div className="part-right"> ₹{totAmt}/-</div> 
                        </div>
                    )
                })
                }
                </div>
               
            
              <div className="grand">Grand Total:  ₹{GrandTotal}/-</div>
            
               
           
            </div>
            <div className="items-section">
                {aggregatedItems.map((item,index)=>(
                    <ItemCard key={index} itemData={item}/>
                ))}
            </div>
        </div>
    </div>
)
}
export default Cart;