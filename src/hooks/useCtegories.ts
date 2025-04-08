import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CategoriesResponse, Category } from '../types/categoryTypys';
import { CategoryProductsResponse, Product } from '../types/productTypes';

const UseCategories = () => {
  const [allcatg, setCateg] = useState<Category[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [products,setProducts]=useState<Product[]>([])
  const getCategories = async (currentPage: number, limit: number): Promise<void> => {
    try {
      const res = await axios.get<CategoriesResponse>('https://apiecommerce-hblh.onrender.com/categories', {
        params: { page: currentPage, limit },
      });

      const categoriesWithNameAndImage: Category[] = res.data.categories.map((category) => ({
        _id: category._id,
        name: category.name,
        image: category.image.secure_url,
      }));

      setCateg(categoriesWithNameAndImage);
      setTotalCategories(res.data.totalCategories);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };
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

  return { allcatg, totalCategories, getCategories,getProductsByCategory,products };
};

export default UseCategories;
