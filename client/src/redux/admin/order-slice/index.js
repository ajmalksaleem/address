import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
};


export const getAllOrders = createAsyncThunk(
  "order/AllOrders",
  async () => {
    const { data } = await axios.get(`/api/admin/order/all-orders`);
    return data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateOrders',
  async({orderId, orderStatus})=>{
    console.log(orderId)
    const {data} = await axios.put(`/api/admin/order/update-order/${orderId}`, {orderStatus})
    return data;
  }
)

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = []
      })
     
  },
});

export default adminOrderSlice.reducer;
