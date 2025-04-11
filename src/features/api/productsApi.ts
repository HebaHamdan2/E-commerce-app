import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductsResponse } from '../../types/productTypes';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://apiecommerce-hblh.onrender.com/',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: 'products',
        params: { page, limit },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
