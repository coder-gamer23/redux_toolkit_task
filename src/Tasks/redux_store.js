
import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialState = {
   productsTotalCount: 0,
   ProductsaddToCart: [],
   addedFavoriteList: [],
   
}

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {

      addProductToCart: (state, action) => {
         state.ProductsaddToCart.push(action.payload);
         state.productsTotalCount += 1
      },
      addexistProductToCart: (state, action) => {
         state.ProductsaddToCart.map((items, i) => {
            if (items.id === action.payload) {
                state.productsTotalCount += 1
                items.count += 1;
            }
         })
      },
      addBulkProductToCart: (state, action) => {
        // let actual_count=state.ProductsaddToCart[action.payload.index].count;
        
        //  state.productsTotalCount = state.productsTotalCount-actual_count
        //  state.ProductsaddToCart[action.payload.index].count = action.payload.count
        //  state.productsTotalCount = state.productsTotalCount+action.payload.count
        let exist_count=0;
        state.ProductsaddToCart.forEach((e,i)=>{
            if(e.id==action.payload.index)
            exist_count=e.count;
        })
        
        if(exist_count<action.payload.count){
            let variation=action.payload.count-exist_count;
            state.productsTotalCount+=variation;
            state.ProductsaddToCart.map((e,i)=>{
                if(e.id==action.payload.index){
                    while(variation>0){
                        e.count+=1;
                        variation--;
                    }
                }
            })
        }else{
            let variation=exist_count-action.payload.count;
            state.productsTotalCount-=variation;
            state.ProductsaddToCart.map((e,i)=>{
                if(e.id==action.payload.index){
                    while(variation>0){
                        e.count-=1;
                        variation--;
                    }
                }
            })
        }

      },
      removeexistProductfromCart: (state, action) => {
         state.ProductsaddToCart.map((items, i) => {
            if (items.id === action.payload) {
               if (items.count > 1)
               state.productsTotalCount -= 1;
               items.count -= 1;
            }
         })
      }
      ,
      removeProductFromCart: (state, action) => {
         state.ProductsaddToCart.splice(action.payload.index, 1);
         state.productsTotalCount -= action.payload.count;
      },
      addfavList: (state, action) => {
         state.addedFavoriteList.push(action.payload)
      },
      clearFullCart: (state, action) => {
        state.ProductsaddToCart = [];
         state.productsTotalCount = 0
      },

      removefavList: (state, action) => {
         const filterData = state.addedFavoriteList.filter((item) => {
            return item.id !== action.payload;
         });
         state.addedFavoriteList = filterData;
      }


   }
})

export const cartActions = cartSlice.actions;

const productCardStore = configureStore({
   reducer: {
      cart: cartSlice.reducer
   }
})

export default productCardStore;