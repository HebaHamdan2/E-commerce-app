import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { updateQuantity } from "../../features/cart/cartSlice"; 
import UseCart from "../../hooks/useCart";

const CartItems = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const {getCart}=UseCart()
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const totalPrice = cart.reduce((acc, item) => {
    const price = typeof item.productId !== "string" ? item.productId.price : 0;
    return acc + item.quantity * price;
  }, 0);
  useEffect(()=>{
    getCart();
  },[cart])

  const handleApplyCoupon = () => {
    if (coupon.trim() === "") return;
    // Simulate a 10% discount
    setDiscount(totalPrice * 0.1);
    setAppliedCoupon(coupon);
    setCoupon("");
  };

  const finalTotal = totalPrice - discount;

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center pt-24 text-gray-500">
        Your cart is currently empty.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between mt-20 mb-20 text-sm">
        <div className="flex text-sm">
          <Link to="/" className="text-primaryText opacity-50">
            Home /
          </Link>
          <span className="ml-1 cursor-pointer">Cart</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items Table */}
        <div className="md:col-span-2 space-y-6">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                if (typeof item.productId === "string") return null;

                const product = item.productId;
                const totalItemPrice = item.quantity * product.price;

                return (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 flex items-center">
                      <img
                        src={product.mainImage.secure_url}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                      <span className="ml-4">{product.name}</span>
                    </td>
                    <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => handleUpdateQuantity(product._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => handleUpdateQuantity(product._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">${totalItemPrice.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cart Summary */}
        <div className="bg-white shadow-lg rounded-xl p-6 border space-y-4">
          <h3 className="text-xl font-semibold">Order Summary</h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon"
              className="w-full border rounded-lg px-4 py-2 text-sm"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Apply
            </button>
          </div>

          {appliedCoupon && (
            <p className="text-sm text-green-600">
              Coupon "<strong>{appliedCoupon}</strong>" applied!
            </p>
          )}

          <hr />

          <p className="text-sm">
            Subtotal: <span className="text-gray-700">${totalPrice.toFixed(2)}</span>
          </p>
          {discount > 0 && (
            <p className="text-sm text-green-600">
              Discount: -${discount.toFixed(2)}
            </p>
          )}
          <p className="text-lg font-semibold">
            Total:{" "}
            <span className="text-green-600">${finalTotal.toFixed(2)}</span>
          </p>

          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItems;
