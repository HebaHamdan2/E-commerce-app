import { useEffect, useState } from "react";
import UseUser from "../../hooks/useUser";

const OrdersList = () => {
  const { getAllOrders, orders } = UseUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null); 

      try {
        await getAllOrders(); 
      } catch (err) {
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); 

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-10">
        Orders ({orders?.length || 0})
      </h2>

      <div className="space-y-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <p className="text-lg font-medium">Order #{order._id}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(order.createdAt)} at{" "}
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <span
                className={`text-sm font-semibold px-4 py-1 rounded-full mt-3 sm:mt-0 ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "confirmed"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "on_way"
                    ? "bg-indigo-100 text-indigo-800"
                    : order.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {order.products.map((orderedProduct, i) => (
                  <div key={i} className="flex items-center gap-4">
                   {orderedProduct.productId?.mainImage?.secure_url && (
        <img
          src={orderedProduct.productId.mainImage.secure_url}
          alt={orderedProduct.productId.name}
          className="w-16 h-16 object-cover rounded"
        />
      )}
                    <div>
                      <p className="text-sm text-gray-500">${orderedProduct.unitPrice}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {orderedProduct.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Info */}
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-semibold text-gray-800">Phone:</span>{" "}
                  {order.phoneNumber}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Address:</span>{" "}
                  {order.address}
                </p>
                {order.couponName && (
                  <p>
                    <span className="font-semibold text-gray-800">
                      Coupon:
                    </span>{" "}
                    {order.couponName}
                  </p>
                )}
                <p>
                  <span className="font-semibold text-gray-800">
                    Payment:
                  </span>{" "}
                  {order.paymentType}
                </p>
                <p className="text-base text-black font-semibold pt-2">
                  Total: ${order.finalPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders?.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          You haven’t placed any orders yet.
        </div>
      )}

    
    </div>
  );
};

export default OrdersList;
