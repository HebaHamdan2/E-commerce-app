import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import UseCart from "../../hooks/useCart";
import toast from "react-hot-toast";

const CartItems = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const { getCart, removeItem, removeItems, updateQuant, createOrder } = UseCart();

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = cart.reduce((acc, item) => {
    const price = typeof item.productId !== "string" ? item.productId.price : 0;
    return acc + item.quantity * price;
  }, 0);

  const finalTotal = parseFloat((totalPrice - discount).toFixed(2));


  useEffect(() => {
    getCart();
  }, []);

  const handleApplyCoupon = () => {
    if (coupon.trim() === "") return;
    setDiscount(totalPrice * 0.1); // Simulate 10% off
    setAppliedCoupon(coupon);
    setCoupon("");
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) updateQuant(productId, quantity);
  };

  const handleCheckout = async () => {
    if (!address || !phone) {
      toast.error("Please enter both address and phone number.");
      return;
    }

    await createOrder({
      couponName: appliedCoupon || undefined,
      address,
      phone,
    });
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center pt-24 text-gray-500 mb-96">
        Your cart is currently empty.
      </div>
    );
  }

  return (
    <div className="mt-20">
      {/* Breadcrumb */}
      <div className="flex justify-between mb-8 text-sm">
        <div className="flex text-sm">
          <Link to="/" className="text-primaryText opacity-50">
            Home /
          </Link>
          <span className="ml-1">Cart</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
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
                          onClick={() =>
                            handleUpdateQuantity(product._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() =>
                            handleUpdateQuantity(product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="ml-4 text-red-500 hover:text-red-700 text-sm"
                          onClick={() => removeItem(product._id)}
                          title="Remove item"
                        >
                          Delete
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

        {/* Checkout Summary */}
        <div className="bg-white shadow-lg rounded-xl p-6 border space-y-4">
          <h3 className="text-xl font-semibold">Order Summary</h3>

          {/* Coupon Input */}
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
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
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

          {/* Pricing Summary */}
          <div className="space-y-1 text-sm">
            <p>
              Subtotal:{" "}
              <span className="text-gray-700">${totalPrice.toFixed(2)}</span>
            </p>
            {discount > 0 && (
              <p className="text-green-600">
                Discount: -${discount.toFixed(2)}
              </p>
            )}
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="text-green-600">${finalTotal}</span>
            </p>
          </div>

          {/* Address & Phone Inputs */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter address"
              className="w-full border rounded-lg px-4 py-2 text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border rounded-lg px-4 py-2 text-sm mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Checkout
          </button>

          {/* Clear Cart Button */}
          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() => {
              removeItems();
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
