
type Props = {
    productId: string;
  };
const ProductReviews = ({productId}:Props) => {
    return (
        <>
         <div className="flex flex-row items-center gap-4 mb-16 mt-36">
                <img src="../../../src/assets/Rectangle 18 (1).svg" alt="header" />
                <h2 className="text-primary text-base font-semibold">Product Reviews</h2>
            </div>
        </>
    );
}

export default ProductReviews;
