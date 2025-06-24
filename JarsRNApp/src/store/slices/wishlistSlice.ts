import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWishlistError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlistLoading,
  setWishlistError,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
