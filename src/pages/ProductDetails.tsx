import { useParams } from "react-router-dom";
import ProductDescription from "../components/Product/ProductDescription";
import ProductReviews from "../components/Product/ProductReviews";

const ProductDetails = () => {
  const {productId}=useParams<{productId:string}>();
    return (
        <div className="wrapper">
      {!productId?<>loading</>:<ProductDescription productId={productId}/>}
      {!productId?<>loading</>:<ProductReviews productId={productId}/>}
        </div>
    );
}

export default ProductDetails;
