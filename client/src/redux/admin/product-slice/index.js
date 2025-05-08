import  { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading : false,
    productList : [],
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct', 
    async(formData)=>{
        const {data} = await axios.post('/api/admin/products/add-products', formData)
        return data;
    });
    
    export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', 
        async()=>{
            const {data} = await axios.get('/api/admin/products/get-products')
            return data;
        });

        export const editProduct = createAsyncThunk('/products/editproduct', 
            async({productId, formData})=>{
                const {data} = await axios.put(`/api/admin/products/edit-product/${productId}`, formData)
                return data;
            })
                 
            export const deleteProduct = createAsyncThunk('/products/deleteproduct', 
                async(productId)=>{
                    const {data} = await axios.delete(`/api/admin/products/delete-product/${productId}`)
                    return data;
                })


const adminProductSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(fetchAllProducts.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllProducts.fulfilled, (state,action)=>{
            state.isLoading = false,
            console.log(action.payload);
            state.productList = action.payload?.allProducts;
        })
        .addCase(fetchAllProducts.rejected, (state,action)=>{
            state.isLoading = false,
            state.productList = []
        })
       
    }
})

export default adminProductSlice.reducer