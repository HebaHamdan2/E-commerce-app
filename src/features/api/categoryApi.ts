import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoriesResponse, Category } from '../../types/categoryTypys';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://apiecommerce-hblh.onrender.com/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<{ categories: Category[]; totalCategories: number }, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: 'categories',
        params: { page, limit },
      }),
      transformResponse: (response: CategoriesResponse) => ({
        categories: response.categories.map((cat) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image.secure_url,
        })),
        totalCategories: response.totalCategories,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
