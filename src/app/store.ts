import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import { categoryApi } from '../features/api/categoryApi'
import { productsApi } from '../features/api/productsApi'

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart:cartReducer
  }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware
     , productsApi.middleware

    ),
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch