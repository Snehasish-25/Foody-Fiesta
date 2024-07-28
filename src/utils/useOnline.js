// import { useEffect,useState } from "react";
// const useOnline=()=>{

//     const [OnlineStatus,setOnlineStatus]=useState(true);
//     useEffect(()=>{

//         window.addEventListener("offline",()=>{
//             setOnlineStatus(false);
//         })
//         window.addEventListener("online",()=>{
//             setOnlineStatus(true);
//         })
//     },[])

//     return OnlineStatus; //Bool value
// }
// export default useOnline;


import { useEffect, useState } from "react";

const useOnline = () => {
    const [OnlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        const handleOffline = () => setOnlineStatus(false);
        const handleOnline = () => setOnlineStatus(true);

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return OnlineStatus; // Bool value
};

export default useOnline;
