import { useLocation } from "react-router-dom";
import ProductDescription from "../components/Product/ProductDescription";
import ProductReviews from "../components/Product/ProductReviews";
import ScrollToTop from "../components/ScrollUp/ScrollToTop";

const ProductDetails = () => {
const location = useLocation();
const productId = location.state?.productId;
    return (
        <div className="wrapper">
          <ScrollToTop/>
      {!productId?<>loading</>:<ProductDescription productId={productId}/>}
      {!productId?<>loading</>:<ProductReviews productId={productId}/>}
        </div>
    );
}

export default ProductDetails;
