import { useEffect } from "react";
import UseSpecificProduct from "../../hooks/useSpecificProduct";

type Props = {
    productId: string;
  };
const ProductReviews = ({productId}:Props) => {
    const {getProduct,productInfo}=UseSpecificProduct();
      useEffect(()=>{
            getProduct(productId);
           
        },[])
    return (
        <>
         <div className="flex flex-row items-center gap-4 mb-16 mt-36">
                <img src="../../../src/assets/Rectangle 18 (1).svg" alt="header" />
                <h2 className="text-primary text-base font-semibold">Rating & Reviews [{productInfo?.reviews.length}]</h2>
            </div>
            <div className="flex flex-col ">
            {productInfo?.reviews.map((review)=>{
return <div className="flex flex-col border rounded py-7 px-8">
    <div className="flex flex-row">
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
    <h3 className="font-bold text-xl pt-1 capitalize">{review.createdBy.userName}</h3>
    <p className="text-sm text-primaryText opacity-50 pt-3 pb-6">"{review.comment}"</p>
<p className="text-sm text-primaryText opacity-50">Posted On {review.createdAt}</p>
</div>
            })}
            </div>

        </>
    );
}

export default ProductReviews;
