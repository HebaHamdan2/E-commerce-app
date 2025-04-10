import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart, ProductInfo, setCart } from '../features/cart/cartSlice';
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

  return { addProduct, getCart };
};

export default UseCart;
