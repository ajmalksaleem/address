import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  approvalURL: null,
  orderList: [],
 // orderDetails : null
};

export const createNewOrder = createAsyncThunk(
  "order/create",
  async (orderData) => {
    const { data } = await axios.post(
      "/api/shop/order/create-order",
      orderData
    );
    return data;
  }
);

export const capturePayment = createAsyncThunk(
  "order/capture-payment",
  async ({ paymentId, payerId, orderId }) => {
    const { data } = await axios.post("/api/shop/order/capture-payment", {
      paymentId,
      payerId,
      orderId,
    });
    return data;
  }
);

export const getUserOrders = createAsyncThunk(
  "order/userorder",
  async ({userId}) => {
    const { data } = await axios.get(`/api/shop/order/userorders/${userId}`);
    return data;
  }
);

// export const getOrderDetails = createAsyncThunk(
//   "order/order-details",
//   async (orderId) => {
//     const { data } = await axios.get(`/api/shop/order/order-details/${orderId}`);
//     return data;
//   }
// );

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = []
      })
     
  },
});

export default shoppingOrderSlice.reducer;
