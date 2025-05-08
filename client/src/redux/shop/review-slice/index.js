import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    reviewList : []
}

export const fetchReviews = createAsyncThunk('/reviews/fetchReviews', 
    async(productId)=>{    
       try {
        const {data} = await axios.get(`/api/shop/review/get/${productId}`)
        return data;
       } catch (error) {
        if(error.response){
            return {error : error.response.data.message}
        }else{
            return {error : error.message}
        }
       }
    });
    
export const AddReview = createAsyncThunk('/reviews/addReview', 
    async({productId,message, rating, userId})=>{
        try {
            const {data} = await axios.post(`/api/shop/review/add-review`,{
                productId,message, rating, userId
            })
        return data;
        } catch (error) {
            if(error.response){
                return {error : error.response.data.message}
            }else{
                return {error : error.message}
            }
        }
    });



const ShopReviewSlice = createSlice({
    name : 'productReviews',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(fetchReviews.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(fetchReviews.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.reviewList = action.payload.data;
        })
        .addCase(fetchReviews.rejected,(state,action)=>{
            state.isLoading = false;
            state.reviewList = [];
        }).addCase(AddReview.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(AddReview.fulfilled,(state,action)=>{
            state.isLoading = false;
        })
        .addCase(AddReview.rejected,(state,action)=>{
            state.isLoading = false;
        })
    }
}) 

export default ShopReviewSlice.reducer;