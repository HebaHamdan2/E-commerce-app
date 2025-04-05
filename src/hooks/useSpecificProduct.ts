import { useState } from 'react';
import { Product, ProductResponse } from '../types/productTypes';
import axios from 'axios';
import toast from 'react-hot-toast';

const UseSpecificProduct = () => {
    const [productInfo,setProductInfo]=useState<Product>();

    const getProduct = async (productId:string): Promise<void> => {
        try {
          const res = await axios.get<ProductResponse>(`https://apiecommerce-hblh.onrender.com/products/${productId}`);
    
          const product: Product= res.data.product;
    
          setProductInfo(product);
        } catch (error) {
          toast.error("Error fetching products");
        }
      };
    return {getProduct,productInfo}
}

export default UseSpecificProduct;
