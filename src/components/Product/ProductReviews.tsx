import { useContext, useEffect, useState } from "react";
import UseSpecificProduct from "../../hooks/useSpecificProduct";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

type Props = {
  productId: string;
};

const ProductReviews = ({ productId }: Props) => {
  const { getProduct, productInfo, addReview, deleteReview, updateReview } = UseSpecificProduct();
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [originalRating, setOriginalRating] = useState<number | null>(null);
  const [originalComment, setOriginalComment] = useState<string>("");

  useEffect(() => {
    getProduct(productId);
    auth?.getuserId?.();
  }, [productId]);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      return toast.success("Please provide both a rating and a comment");
    }

    if (editingReview) {
      const isRatingChanged = rating !== originalRating;
      const isCommentChanged = comment !== originalComment;

      if (isRatingChanged || isCommentChanged) {
        await updateReview(
          editingReview,
          isCommentChanged ? comment : undefined,
          isRatingChanged ? rating : undefined
        );
      }
      setEditingReview(null);
      setOriginalRating(null);
      setOriginalComment("");
    } else {
      await addReview(productId, comment, rating);
      await getProduct(productId);
      setRating(0);
      setComment("");
    }
  };

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

  const handleEdit = (review: any) => {
    setEditingReview(review._id);
    setOriginalRating(review.rating);
    setOriginalComment(review.comment);
    setRating(review.rating);
    setComment(review.comment);
  };

  // 🧱 Skeleton loader while fetching
  if (!productInfo) {
    return (
      <div className="mt-36 space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-10 h-6 bg-gray-300 rounded" />
          <div className="w-48 h-6 bg-gray-300 rounded" />
        </div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border rounded p-6 space-y-3">
            <div className="flex gap-2">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-4 h-4 bg-gray-300 rounded" />
              ))}
            </div>
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row items-center gap-4 mb-8 mt-36">
        <img src="/assets/Rectangle 18 (1).svg" alt="header" />
        <h2 className="text-primary text-base font-semibold">
          Rating & Reviews [{productInfo?.reviews.length}]
        </h2>
      </div>

      {/* Existing Reviews */}
      <div className="flex flex-col gap-6">
        {productInfo?.reviews.map((review) => (
          <div key={review._id} className="flex flex-col border rounded py-7 px-8">
            <div className="flex flex-row mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={
                    review.rating >= i + 1
                      ? "/assets/Vector (5).svg"
                      : review.rating >= i + 0.5
                      ? "/assets/star-half-filled.svg"
                      : "/assets/Vector (6).svg"
                  }
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-xl capitalize">{review.createdBy.userName}</h3>
              {review.createdBy._id === auth?.userId && (
                <div className="flex flex-row gap-4 mt-2 text-sm text-primary">
                  <button onClick={() => handleEdit(review)}>Edit</button>
                  <button onClick={() => handleDelete(review._id)}>Delete</button>
                </div>
              )}
            </div>
            <p className="text-sm text-primaryText opacity-50 pt-3 pb-6">"{review.comment}"</p>
            <p className="text-sm text-primaryText opacity-50">
              Posted On{" "}
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Add/Edit Review Form */}
      {auth?.isAuthenticated&&(<div className="border rounded p-6 my-10">
        <h3 className="text-lg font-semibold mb-4">{editingReview ? "Edit Review" : "Leave a Review"}</h3>
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <img
              key={num}
              src={
                rating >= num
                  ? "/assets/Vector (5).svg"
                  : "/assets/Vector (6).svg"
              }
              alt="star"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setRating(num)}
            />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-3 text-sm mb-4"
          placeholder="Write your review here..."
        />
        <button onClick={handleSubmit} className="bg-primary text-white px-6 py-2 rounded">
          {editingReview ? "Update Review" : "Submit Review"}
        </button>
      </div>)}
      
    </>
  );
};

export default ProductReviews;
