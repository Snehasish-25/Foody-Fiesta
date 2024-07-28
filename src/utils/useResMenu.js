import { useEffect, useState } from "react";
import { RES_MENU } from "./constants";

const useResMenu= (resId)=>{

    const [ResInfo,setResInfo]=useState(null);
    

    useEffect(()=>{
        fetchMenu();
    },[resId])

    const fetchMenu=async ()=>{
        const data=await fetch(RES_MENU+resId);
        const json=await data.json();
        //console.log("Fetched JSON:", json); 
        setResInfo(json);
    }


  return ResInfo;
}
export default useResMenu;


