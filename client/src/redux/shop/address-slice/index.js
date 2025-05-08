import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  isLoading: false,
  addressData: [],
};

export const addAddress = createAsyncThunk(
  "/address/addAddress",
  async (formData) => {
    const { data } = await axios.post("/api/shop/address/add-address", {
      ...formData,
    });
    return data;
  }
);


export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({userId, addressId, formData}) => {
    const { data } = await axios.put(`/api/shop/address/edit-address/${userId}/${addressId}`, {
      ...formData,
    });
    return data;
  }
);


export const getAddress = createAsyncThunk(
  "/address/getAddress",
  async ({userId}) => {
    const { data } = await axios.get(`/api/shop/address/fetch-address/${userId}`);
    return data;
  }
);


export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({userId, addressId}) => {
    const { data } = await axios.delete(`/api/shop/address/delete-address/${userId}/${addressId}`);
    return data;
  }
);



const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {builder
    .addCase(addAddress.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(addAddress.fulfilled, (state,action)=>{
        state.isLoading = true;
    })
    .addCase(addAddress.rejected, (state)=>{
        state.isLoading = false;
    })
    .addCase(editAddress.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(editAddress.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.addressData = action.payload.data
    })
    .addCase(editAddress.rejected, (state)=>{
        state.isLoading = false;
    })
    .addCase(getAddress.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(getAddress.fulfilled, (state,action)=>{
        state.isLoading = true;
        state.addressData = action.payload.data
    })
    .addCase(getAddress.rejected, (state)=>{
        state.isLoading = false;
    })
    .addCase(deleteAddress.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(deleteAddress.fulfilled, (state,action)=>{
        state.isLoading = true;
    })
    .addCase(deleteAddress.rejected, (state)=>{
        state.isLoading = false;
    })
    
},
});


export default addressSlice.reducer