import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart, clearCart, ProductInfo, removeFromCart, setCart } from '../features/cart/cartSlice';
import { CartItem } from '../features/cart/cartSlice';

const UseCart = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const addProduct = async (product: ProductInfo, quantity: number = 1) => {
    const headers = {
      authorization: `Heba__${auth?.user.token}`,
    };

    const data = {
      productId: product._id, 
      quantity,
    };

    try {
      const response = await axios.post('https://apiecommerce-hblh.onrender.com/cart', data, {
        headers,
      });

      if (response.data?.message === 'success') {
        const newCartItem: CartItem = {
          productId: product, 
          quantity,
        };

        dispatch(addToCart(newCartItem));
        toast.success('Product added successfully!');
      } else {
        toast.error(
          response.data?.validationError?.[0]?.message || 'An error occurred.'
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred.');
    }
  };


  const getCart = async (): Promise<void> => {
    const headers = {
      authorization: `Heba__${auth?.user.token}`,
    };

    try {
      const response = await axios.get('https://apiecommerce-hblh.onrender.com/cart/get', {
        headers,
      });

      if (response.data?.message === 'success') {
        const cartItems: CartItem[] = response.data.cart.products.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        dispatch(setCart(cartItems));
      } else {
        toast.error(
          response.data?.validationError?.[0]?.message || 'An error occurred.'
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred.');
    }
  };
  const removeItem=async(productId:string):Promise<void>=>{
    if (!auth?.user?.token) return;
    const headers = {
      authorization: `Heba__${auth?.user.token}`,
    };
    const data={
      productId:productId
    }
    try {
      const response = await axios.patch('https://apiecommerce-hblh.onrender.com/cart/removeItem',data,{
        headers,
      });

      if (response.data?.message === 'Item removed successfully') {
      toast.success("Item removed successfully")
        dispatch(removeFromCart(productId));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred.');
    }
  }
  const removeItems=async()=>{
    if (!auth?.user?.token) return;
    const headers = {
      authorization: `Heba__${auth?.user.token}`,
    };

    try {
      const response = await axios.patch('https://apiecommerce-hblh.onrender.com/cart/clear',{},{
        headers,
      });

      if (response.data?.message === 'Cart cleared successfully') {
      toast.success("Cart cleared successfully")
        dispatch(clearCart());
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred.');
    }
  }

  return { addProduct, getCart,removeItem ,removeItems};
};

export default UseCart;
