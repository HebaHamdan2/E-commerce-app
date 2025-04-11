import { useContext, useState } from 'react';
import { Product, ProductResponse, ReviewResponse } from '../types/productTypes';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

const UseSpecificProduct = () => {
  const [productInfo, setProductInfo] = useState<Product>();
  const auth = useContext(AuthContext);

  const getProduct = async (productId: string): Promise<void> => {
    try {
      const res = await axios.get<ProductResponse>(`https://apiecommerce-hblh.onrender.com/products/${productId}`);
      setProductInfo(res.data.product);
    } catch (error) {
      toast.error("Error fetching product");
    }
  };

  const addReview = async (productId: string, comment: string, rating: number): Promise<void> => {
    try {
      const headers = {
        authorization: `Heba__${auth?.user.token}`,
      };
      const data = {
        comment,
        rating: rating.toString(),
      };

      const response = await axios.post<ReviewResponse>(
        `https://apiecommerce-hblh.onrender.com/review/${productId}`,
        data,
        { headers }
      );

      if (response.data?.message === 'success') {
        toast.success('Review added successfully!');
        await getProduct(productId); // Refresh product after adding review
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error adding review');
    }
  };

  const deleteReview = async (reviewId: string): Promise<void> => {
    let headers = {
      authorization: `Heba__${auth?.user.token}`,
    };
  
    try {
      const response = await axios.delete(
        `https://apiecommerce-hblh.onrender.com/review/delete/${reviewId}`,
        { headers }
      );
  
      if (response.data?.message === 'Review deleted successfully') {
        toast.success('Review deleted successfully');
        if(productInfo){
       getProduct(productInfo?._id)
        }
       
        
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Error deleting review');
    }
  };
  
  const updateReview = async (reviewId: string, comment?: string, rating?: number) => {
    let headers = {
      authorization: `Heba__${auth?.user.token}`,
    };
    const data: any = {};
    if (comment) data.comment = comment;
    if (rating) data.rating = rating.toString();

    try {
      const response = await axios.patch(
        `https://apiecommerce-hblh.onrender.com/review/update/${reviewId}`,
        data,
        { headers }
      );
      
      if (response.data?.message === "Review updated successfully") {
        toast.success("Review updated successfully");
        return true; 
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "Error updating review");
      return false;
    }
  };

  

  return { getProduct, productInfo, addReview, deleteReview,updateReview };
};

export default UseSpecificProduct;
