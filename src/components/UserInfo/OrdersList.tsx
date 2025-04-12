import { useEffect, useState } from "react";
import UseUser from "../../hooks/useUser";
import toast from "react-hot-toast";

const OrdersList = () => {
  const { getAllOrders, orders } = UseUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { cancelOrder } = UseUser();

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = (orderId: string) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-md border border-gray-200 w-[300px]">
        <p className="text-sm text-gray-700 mb-4">Are you sure you want to cancel your order?</p>
        <div className="flex justify-end gap-2">
          <button
            className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={async () => {
              toast.dismiss(t.id);
              await cancelOrder(orderId);
              fetchOrders();
            }}
          >
            Cancel Order
          </button>
        </div>
      </div>
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  // 🔄 Skeleton Loader
  if (loading) {
    return (
      <div className="pt-24 max-w-6xl mx-auto px-4 animate-pulse space-y-6">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-xl p-6 border border-gray-100 space-y-4"
          >
            <div className="flex justify-between">
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="space-y-1 w-full">
                      <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-full"></div>
                ))}
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4 mb-96">
      <h2 className="text-2xl font-semibold mb-10">
        Orders ({orders?.length || 0})
      </h2>

      <div className="space-y-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
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

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span
                  className={`text-sm font-semibold px-4 py-1 rounded-full ${
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

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="text-primary px-4 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
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
                  <span className="font-semibold text-gray-800">Payment:</span>{" "}
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

      {orders?.length === 0 && !loading && (
        <div className="text-center mt-10 text-gray-500 mb-96">
          You haven’t placed any orders yet.
        </div>
      )}
    </div>
  );
};

export default OrdersList;
