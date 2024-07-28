import { CDN_URL } from "../utils/constants";
import { STAR_ICON } from "../utils/constants";

const ResCard=(props)=>{
    const {resData}=props;  //ObjectDestructuring
     const {cloudinaryImageId,name,avgRatingString,sla,costForTwo,cuisines}=resData.info; 
     //Mockdata ke case me details of restaurants are present like resData.card.card.info
    return(
        <div className="res-card">
  
        <div className="res-logo-container">
        <img className="res-logo" src={CDN_URL+cloudinaryImageId}></img>
        </div>
         
          <div className="details">
              <h3>{name}</h3>
              <div className="additionals">
              <div className="rating-icon">
                <img className="star" src={STAR_ICON}></img>
              </div>
                  <div className="rating"><b>{avgRatingString}</b></div>
                  <div className="time"><b>{sla.slaString}</b></div>
              </div>
              <h4 className="price"><i>{costForTwo}</i></h4>
              <p className="cuisine">{cuisines.join(", ")}
                  </p>
          </div>
          
        </div>
    )
  }

  //HIGHER ORDER COMPONENT --> Takes a component and returns an enhanced component
  export const withlabel=(ResCard)=>{

    return (props)=>{
      const {resData}=props;
      const {aggregatedDiscountInfoV3}=resData.info;
      const {header,subHeader}=aggregatedDiscountInfoV3;
      
      return (
        <div>
           <ResCard {...props}/>
           <div className="discount">{header} {subHeader} </div>
        </div>
      )
    }
  }

  export default ResCard;