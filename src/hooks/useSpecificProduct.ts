import { useContext, useState } from 'react';
import { Product, ProductResponse, ReviewResponse } from '../types/productTypes';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

const UseSpecificProduct = () => {
    const [productInfo,setProductInfo]=useState<Product>();

    let  auth  = useContext(AuthContext);
    const getProduct = async (productId:string): Promise<void> => {
        try {
          const res = await axios.get<ProductResponse>(`https://apiecommerce-hblh.onrender.com/products/${productId}`);
    
          const product: Product= res.data.product;
    
          setProductInfo(product);
        } catch (error) {
          toast.error("Error fetching products");
        }
      };
      const addReview=async(productId:string,comment:string,rating:number):Promise<void> =>{
        let headers = {
          authorization: `Heba__${auth?.user.token}`,
        };
  let data={
      "comment":comment,
      "rating":rating.toString()
  }
        try{
const response=await axios.post<ReviewResponse>(`https://apiecommerce-hblh.onrender.com/review/${productId}`,data,{headers})
if (response.data?.message === 'success') {
  toast.success('Review added successfully!');
} 
        }catch(error:any){
          toast.error(error?.response.data.message)
        }

      }
    return {getProduct,productInfo,addReview}
}

export default UseSpecificProduct;
