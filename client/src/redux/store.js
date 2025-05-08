import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/authSlice'
import adminProductSlice from './admin/product-slice/index'
import ShopProductSlice from "./shop/product-slice/index"
import shoppingCartSlice from './shop/cart-slice/index'
import shoppingAddressSlice from './shop/address-slice/index'
import shoppingOrderSlice from './shop/order-slice/index'
import adminOrderSlice from './admin/order-slice/index'
import productReviewSlice from './shop/review-slice/index'


const store = configureStore({
    reducer :{
       auth : authReducer ,
       adminProducts : adminProductSlice,
       shopProducts : ShopProductSlice,
       shopCart : shoppingCartSlice,
       address : shoppingAddressSlice,
       shopOrders : shoppingOrderSlice,
       adminOrders : adminOrderSlice,
       reviews : productReviewSlice
    }
})

export default store