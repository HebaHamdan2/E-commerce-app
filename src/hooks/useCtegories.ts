import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CategoriesResponse, Category } from '../types/categoryTypys';

const UseCategories = () => {
  const [allcatg, setCateg] = useState<Category[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0);

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
      console.error(error);
    }
  };

  return { allcatg, totalCategories, getCategories };
};

export default UseCategories;
