
type Props = {
    productId: string;
  };
const ProductDescription = ({productId}:Props) => {
    
    return (
        <div>
            {productId}
        </div>
    );
}

export default ProductDescription;
