import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
        resDetails:{}
    },
    reducers:{
        addItem:(state,action)=>{
            console.log(action.payload);
            console.log(action.payload.card.info.id)
            //const{itemId}=action.payload.card.info;
            state.items.push(action.payload);
            console.log(typeof(state.items))
            console.log(state.items.length)
            console.log(state.items[0])
        },
        
        decreaseItemQuantity: (state, action) => {
            const existingItem = state.items.find(
              (item) => item?.card?.info?.id === action.payload
            );
            
            console.log(typeof(existingItem))
            console.log(existingItem)
            if (existingItem && existingItem.quantity > 0) {
              existingItem.quantity--;

              console.log(existingItem.quantity);

              if (existingItem.quantity === 0) {
                state.items = state.items.filter(
                  (item) => item?.card?.info?.id !== action.payload
                );
              }
            }
          },
        clearCart:(state)=>{
            state.items.length=0;
        },
    }
    
})

export const {addItem,decreaseItemQuantity,clearCart}=cartSlice.actions;
export default cartSlice.reducer;
