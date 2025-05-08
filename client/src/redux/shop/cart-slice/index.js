import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    cartItems : []
}


export const addToCart = createAsyncThunk('cart/AddToCart', async({userId, productId, quantity})=>{
    try {
        const response = await axios.post('/api/shop/cart/addtocart', {
            userId, productId, quantity
        })
    return response.data
    } catch (error) {
        if(error.response){
            return {error : error.response.data.message}
        }else{
            return {error : error.message}
        }
    }
})

export const fetchCart = createAsyncThunk('cart/fetchCart', async({userId})=>{
    const response = await axios.get(`/api/shop/cart/getcart/${userId}`)
    return response.data
})

export const UpdateCart = createAsyncThunk('cart/UpdateCart', async({userId, productId, quantity}, {rejectWithValue})=>{
    try { 
        const response = await axios.put('/api/shop/cart/updatecart', {
            userId, productId, quantity
        })
    return response.data
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
    }
})

export const DeleteCart = createAsyncThunk('cart/DeleteCart', async({userId, productId})=>{
    const response = await axios.delete(`/api/shop/cart/deletecart/${userId}/${productId}`)
    return response.data
})

const shoppingCartSlice = createSlice({
    name : 'shoppingCart',
    initialState,
    reducers : {
        removeItem: (state, action) => {
            if (state.cartItems.items) {
              state.cartItems.items = state.cartItems.items.filter(
                item => item.productId._id.toString() !== action.payload.toString()
              );
            }
          },
    },
    extraReducers : (builder)=>{
        builder.addCase(addToCart.pending, (state)=>{
            state.isLoading = true
        }).addCase(addToCart.fulfilled , (state, action)=>{
            state.isLoading = false
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state)=>{
            state.isLoading = false
            state.cartItems = [];
        })
        .addCase(fetchCart.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchCart.fulfilled , (state, action)=>{
            state.isLoading = false
            state.cartItems = action.payload.data;
        }).addCase(fetchCart.rejected, (state)=>{
            state.isLoading = false
            state.cartItems = [];
        })
        .addCase(UpdateCart.pending, (state)=>{
            state.isLoading = true
        }).addCase(UpdateCart.fulfilled , (state, action)=>{
            state.isLoading = false
            state.cartItems = action.payload.data;
        }).addCase(UpdateCart.rejected, (state)=>{
            state.isLoading = false
        })
        .addCase(DeleteCart.pending, (state)=>{
            state.isLoading = true
        }).addCase(DeleteCart.fulfilled , (state, action)=>{
            state.isLoading = false
        }).addCase(DeleteCart.rejected, (state)=>{
            state.isLoading = false
        })
    }
})

export default shoppingCartSlice.reducer
export const { removeItem } = shoppingCartSlice.actions;