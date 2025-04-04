import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Product, ProductsResponse } from "../types/productTypes";

const UseProducts = () => {
    const [allproducts, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);
  
    const getProducts = async (currentPage: number, limit: number): Promise<void> => {
      try {
        const res = await axios.get<ProductsResponse>('https://apiecommerce-hblh.onrender.com/products', {
          params: { page: currentPage, limit },
        });
  
        const Products: Product[] = res.data.products.map((product) => ({
          _id: product._id,
          name: product.name,
          mainImage: {
            public_id: product.mainImage.public_id,
            secure_url: product.mainImage.secure_url,
          },
          price:product.price,
          reviews:product.reviews,
          avgRating:product.avgRating
        }));
  
        setProducts(Products);
        setTotalProducts(res.data.total);
      } catch (error) {
        toast.error("Error fetching products");
      }
    };
  
    return { allproducts, totalProducts, getProducts };
}

export default UseProducts;
