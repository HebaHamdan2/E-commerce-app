import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const UseAddToCart = () => {
    let  auth  = useContext(AuthContext);
 const  addProduct=async(productId:String,quantity:number)=>{
    let headers = {
        authorization: `Heba__${auth?.user.token}`,
      };
let data={
    "productId":productId,
    "quantity":quantity || 1
}
try {
    const response = await axios.post('https://apiecommerce-hblh.onrender.com/cart', data, {
      headers: headers,
    });

    if (response.data?.message === 'success') {
      toast.success('Product added successfully!');
    } else {
      toast.error(
        response.data?.validationError[0]?.message || 'An error occurred.'
      );
    }
  } catch (err:any) {
    toast.error(err.response?.data?.message || 'An error occurred.');
  }

 }
    return {addProduct}
}

export default UseAddToCart;
