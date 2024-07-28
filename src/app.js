import React, { useState } from "react";
import ReactDom from "react-dom/client";
import User from "./components/Class/User";
import UserClass from "./components/Class/UserClass";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import ResMenu from "./components/ResMenu";
import LoginPage from "./components/LoginPage";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart";

import UserContext from "./context/UserContext";
import LoginBtn from "./context/LoginBtn";
import appStore from "./cartStore/appStore";
import {Provider} from "react-redux";
import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";


//createBrowserRouter is a method/function and RouterProvider & Outlet are components



const AppLayout=()=>{
    const [userName,setuserName]=useState();
    const [ButtonStatus,setButtonStatus]=useState("Login");
    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{loggedInUser:userName,setuserName}}>
            <LoginBtn.Provider value={{btnStatus:ButtonStatus,setButtonStatus}}>
             <div className="app">
               <Header/>
               <Outlet/>
             </div>
             </LoginBtn.Provider>
             </UserContext.Provider>
        </Provider>
        
    )
}
const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[  //Creating children routes
        {
            path:"/",
            element:<Body/>
        },
        {
            path:"/about",
            element:<About/>,
        },
        {
            path:"/restaurants/:resId",
            element:<ResMenu/>,
        },
        {
            path:"/user",
            element:<User name={"Snehasish"} location={"Dehradun"}/>
        },
        {
            path:"/userclass",
            element:<UserClass name={"Snehasish"} location={"Dehradun"}/>
        },
        {
            path:"/login",
            element:<LoginPage/>
        },
        {
            path:"/contact",
            element:<ContactUs/>
        },
        {
            path:"/cart",
            element:<Cart/>
        }
        ],
        errorElement:<Error/>
    }
    
]);

const root=ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);