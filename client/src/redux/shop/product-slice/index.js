import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null ,
    searchResults : []
}

export const fetchShopProducts = createAsyncThunk('/products/fetchShopProducts', 
    async({filterParams, sortParams})=>{
        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        })        
        const {data} = await axios.get(`/api/shop/products/get-products?${query}`)
        return data;
    });
    
export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails', 
    async(productId)=>{
        const {data} = await axios.get(`/api/shop/products/productdetails/${productId}`)
        return data;
    });


export const searchProducts= createAsyncThunk('/products/searchproducts', 
    async(keyword)=>{
        const {data} = await axios.get(`/api/shop/products/search/${keyword}`)
        return data;
    });



const ShopProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {
        resetSearchResults: (state) => {
            state.searchResults = [];
          },
    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchShopProducts.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(fetchShopProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.productList = action.payload.data;
        })
        .addCase(fetchShopProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.productList = [];
        }).addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.productDetails = action.payload.data;
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading = false;
            state.productDetails = null;
        }).addCase(searchProducts.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(searchProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.searchResults = action.payload.data;
        })
        .addCase(searchProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.searchResults = null;
        })
    }
}) 
export const { resetSearchResults } = ShopProductSlice.actions;

export default ShopProductSlice.reducer;