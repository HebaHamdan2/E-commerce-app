import { useEffect, useState } from "react";
import UseUser from "../../hooks/useUser";
import toast from "react-hot-toast";
import UseSpecificProduct from "../../hooks/useSpecificProduct";
import { useNavigate } from "react-router-dom";

const ReviewsList = () => {
  const { getAllReviews, reviews } = UseUser();
  const { deleteReview } = UseSpecificProduct();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await getAllReviews();
      setLoading(false);
    };
    fetch();
  }, []);

  const handleDelete = (reviewId: string) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-md border border-gray-200 w-[300px]">
        <p className="text-sm text-gray-700 mb-4">Are you sure you want to delete this review?</p>
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
              try {
                await deleteReview(reviewId);
              } catch (error) {
                toast.error("Failed to delete review.");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const handleReview = (productId: string, slug: string, categoryId: string) => {
    navigate(`/products/${categoryId}/${slug}`, { state: { productId } });
  };

  const SkeletonReview = () => (
    <div className="animate-pulse flex flex-col border rounded py-7 px-8 space-y-4">
      <div className="bg-gray-300 w-20 h-20 rounded" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-1/4" />
    </div>
  );

  return (
    <>
      <div className="flex flex-row mt-24 text-xl font-normal mb-16">
        Reviews [{reviews?.length || 0}]
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-96 mt-14 w-full max-w-7xl">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonReview key={idx} />
          ))}
        </div>
      ) : reviews?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-96 mt-14 w-full max-w-7xl">
          {reviews.map((review) => {
            const product =
              typeof review.productId === "string" ? null : review.productId;

            return (
              <div
                key={review._id}
                className="flex flex-col cursor-pointer border rounded py-7 px-8"
              >
                {/* Product Image */}
                {product?.mainImage?.secure_url && (
                  <img
                    src={product.mainImage.secure_url}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded mb-4"
                  />
                )}

                {/* Top Section: Title + Rating + Actions */}
                <div className="flex flex-col 2md:flex-row items-center 2md:justify-between w-full">
                  <h2 className="font-semibold">{product?.name}</h2>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-row">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <img
                          key={i}
                          src={
                            review.rating >= i + 1
                              ? "../../../src/assets/Vector (5).svg"
                              : review.rating >= i + 0.5
                              ? "../../../src/assets/star-half-filled.svg"
                              : "../../../src/assets/Vector (6).svg"
                          }
                          alt="star"
                          className="w-4 h-4"
                        />
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row gap-2">
                      <img
                        src="../../../src/assets/Frame 568.svg"
                        alt="delete"
                        className="cursor-pointer"
                        onClick={() => handleDelete(review._id)}
                      />
                      {product && (
                        <img
                          src="../../../src/assets/Fill Eye.svg"
                          alt="eye"
                          className="cursor-pointer"
                          onClick={() =>
                            handleReview(product._id, product.slug, product.categoryId)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-primaryText opacity-50 pt-3 pb-6">
                  "{review.comment}"
                </p>

                <p className="text-sm text-primaryText opacity-50">
                  Posted On{" "}
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center mb-96 text-4xl font-semibold">
          No Reviews Created Yet!
        </div>
      )}
    </>
  );
};

export default ReviewsList;
