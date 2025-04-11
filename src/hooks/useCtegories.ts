import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CategoriesResponse, Category } from '../types/categoryTypys';
import { CategoryProductsResponse, Product } from '../types/productTypes';

const UseCategories = () => {
  const [products,setProducts]=useState<Product[]>([])
  
  const getProductsByCategory=async(categoryId:string | undefined):Promise<void>=>{
try{
  const res = await axios.get<CategoryProductsResponse>(`https://apiecommerce-hblh.onrender.com/products/category/${categoryId}`);
if(res.data.products){
  setProducts(res.data.products)
}
}catch(error){
  console.log(error)
  toast.error("Error fetching products");
}
  }

  return { getProductsByCategory,products };
};

export default UseCategories;
