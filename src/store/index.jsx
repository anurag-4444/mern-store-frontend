import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slices/products.jsx'
import productDetailSlice from './slices/productDetail.jsx'
import userSlice from './slices/user.jsx'
import userAccountSlice from './slices/userAccount.jsx'
import userCartSlice from "./slices/userCart.jsx";
import userWishlistSlice from "./slices/wishlistCart.jsx";
import userOrderSlice from "./slices/orderDetail.jsx";
import adminProductSlice from "./slices/adminStore.jsx";

const store = configureStore({
    reducer: {       
        Products: productSlice,
        Product: productDetailSlice, 
        User: userSlice,
        UserAccount: userAccountSlice,
        UserCart: userCartSlice,
        Wishlist: userWishlistSlice,
        UserOrder: userOrderSlice,
        AdminStore: adminProductSlice,
    }
})

export default store