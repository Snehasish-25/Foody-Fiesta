import { useState,useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { LOGIN_ICON } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../context/UserContext";
import LoginBtn from "../context/LoginBtn";
import { useSelector } from "react-redux";
import { CART_ICON } from "../utils/constants";

const Header=()=>{

    //const [LoginBtn,setLoginBtn] =useState("Login");
   /* const handleLogin=()=>{
        LoginBtn==="Login" ? setLoginBtn("Logout"):setLoginBtn("Login");
    }*/
        const onlineStatus=useOnline();
        const {loggedInUser,setuserName}=useContext(UserContext);
        const {btnStatus,setButtonStatus}=useContext(LoginBtn);

        const cartItems=useSelector((store)=>store.cart.items)
        console.log(cartItems);

        const handleLogout=()=>{
            setuserName("");
            setButtonStatus("Login")
        }


    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL}></img>
                <div className="brand-name">
                    <h1 className="brand">Foody Fiesta</h1>
                </div>
            </div>
            <div className="nav-items">
                <ul>
                    <li className="user-disp">Welcome! {loggedInUser}</li>
                    <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li className=""><Link to="/cart"><img className="cart-icon" src={CART_ICON}></img></Link></li>
                    <span className="total-item">({cartItems.length})</span>
                </ul>
                <div className="login">
                        <img className="login-icon" src={LOGIN_ICON}></img>
                        {
                            btnStatus==="Login" ? <Link to="/login"><button className="login-btn">{btnStatus}</button></Link> : <Link to="/"><button className="login-btn" onClick={handleLogout}>{btnStatus}</button></Link>
                        }
                        
                </div>
            </div>
        </div>
    )
}
export default Header;