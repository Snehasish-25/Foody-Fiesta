import React from "react";
class UserClass extends React.Component{
    constructor(props)
    {
        super(props);

        // state variable kaise create kare class based component me
        this.state={

            userInfo:{
                name:"default name",
                location:"default location",
            },
            count:1,
            count2:2,
        }
    }
    //used to make api calls once the page is rendered
    
    async componentDidMount()
    {
        const data=await fetch("https://api.github.com/users/akshaymarch7");
        const json=await data.json();
        console.log("Mounted");
       
        this.setState({
            userInfo:json
        })
       this.timer= setInterval(()=>{
        console.log("namaste React");
    },1000);
    }
    componentDidUpdate()
    {

    //ComponentDidMount is called only on initial Render
    //But just like if we dont pass any dependency array in useEffect() it calls every time the component renders
    //similarly on every render componentDidUpdate is called
        console.log("Component updated");
    }

    //What is the usecase of componentWillUnmount-->suppose we have a setinterval function that executes after 
    //every sec inside the componentDidMount method now it will continue to execute even if we move to some other
    // page this will cause our app to crash after sometime  so we need to make sure that we remove that 
    //setInterval once we leave the page,It can be done using ComponentWillUnmount.

    //How to do same thing in functional component useEffect--> we have to write a return a callback from there-->it will be called when we unmount

    componentWillUnmount()
    {
        clearInterval(this.timer);
        console.log("Unmounted");
    }
    render()
    {
        const {name,location}=this.state.userInfo;
        const {count,count2}=this.state;
        return(
            <div className="user-card">
             
            
            <h1>Name:{name}</h1>
            <h2>Location:{location}</h2>
            <h3>contact:@Sneha</h3>
            <h4>count:{count}</h4>
            <button onClick={()=>{
                this.setState({
                    count:count+1
                })
            }}>Click to increase</button>
            <button onClick={()=>{
                this.setState({
                    count:count-1
                })
            }}>Click to decrease</button>
            <h4>count:{count2}</h4>

        </div>
        )
    }
   
}
export default UserClass;