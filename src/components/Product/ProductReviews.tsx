import { useEffect, useState } from "react";
import UseSpecificProduct from "../../hooks/useSpecificProduct";

type Props = {
  productId: string;
};

const ProductReviews = ({ productId }: Props) => {
  const { getProduct, productInfo, addReview } = UseSpecificProduct(); // Assuming `addReview` exists in the hook

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    getProduct(productId);
  }, []);

  const handleSubmit = async () => {
    if (!rating || !comment) return alert("Please add both rating and comment");

    await addReview(productId,  comment, rating ); 
    getProduct(productId); // refresh reviews
    setRating(0);
    setComment("");
  };

  return (
    <>
      <div className="flex flex-row items-center gap-4 mb-8 mt-36">
        <img src="../../../src/assets/Rectangle 18 (1).svg" alt="header" />
        <h2 className="text-primary text-base font-semibold">
          Rating & Reviews [{productInfo?.reviews.length}]
        </h2>
      </div>
      {/* Existing Reviews */}
      <div className="flex flex-col gap-6">
        {productInfo?.reviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col border rounded py-7 px-8"
          >
            <div className="flex flex-row mb-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const rating = review?.rating ?? 0;
                return (
                  <img
                    key={i}
                    src={
                      rating >= i + 1
                        ? "../../../src/assets/Vector (5).svg"
                        : rating >= i + 0.5
                        ? "../../../src/assets/star-half-filled.svg"
                        : "../../../src/assets/Vector (6).svg"
                    }
                    alt="star"
                    className="w-4 h-4"
                  />
                );
              })}
            </div>
            <h3 className="font-bold text-xl capitalize">
              {review.createdBy.userName}
            </h3>
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
        ))}
      </div>
       {/* Add Review Form */}
       <div className="border rounded p-6 my-10">
        <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <img
              key={num}
              src={
                rating >= num
                  ? "../../../src/assets/Vector (5).svg"
                  : "../../../src/assets/Vector (6).svg"
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
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-6 py-2 rounded"
        >
          Submit Review
        </button>
      </div>

    </>
  );
};

export default ProductReviews;
