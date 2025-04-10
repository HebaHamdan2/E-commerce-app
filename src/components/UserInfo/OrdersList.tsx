import { useEffect, useState } from "react";
import UseUser from "../../hooks/useUser";
import toast from "react-hot-toast";

const OrdersList = () => {
  const { getAllOrders, orders } = UseUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let{cancelOrder}=UseUser()
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
              fetchOrders()
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

  

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
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
              {order.status==="pending"&& <p className="text-primary px-4 py-1 bg-red-200 rounded-full  text-sm font-semibold  mt-3 cursor-pointer items-center" onClick={()=>handleCancel(order._id)}>Cancel</p>
      }          </div>

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
        <div className="text-center mt-10 text-gray-500 mb-96">
          You haven’t placed any orders yet.
        </div>
      )}

    
    </div>
  );
};

export default OrdersList;
