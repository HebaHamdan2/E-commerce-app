import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image } from '../../types/authTypes';

export interface ProductInfo {
  _id: string;
  name: string;
  price: number;
  mainImage: Image;
}

export interface CartItem {
  productId: ProductInfo;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId._id !== action.payload
      );
    },
    clearCart:(state)=>{
      state.cartItems=[];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.productId._id === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity ,clearCart} =
  cartSlice.actions;

export default cartSlice.reducer;
