import { useEffect, useState } from "react";
import UseSpecificProduct from "../../hooks/useSpecificProduct";
import { Link } from "react-router-dom";

type Props = {
    productId: string;
  };
const ProductDescription = ({productId}:Props) => {
    const {getProduct,productInfo}=UseSpecificProduct();
    let [preview,setPreview]=useState<string | undefined>('')
    useEffect(()=>{
        getProduct(productId);
    },[])
    return (
<><div className="flex flex-row pt-20 pb-20">
  <Link to="/" className="text-primaryText opacity-50">Home / </Link>
  <span className="cursor-pointer">{productInfo?.name}</span> 
</div>

<div className="flex flex-col 2md:flex-row 2md:gap-12 gap-16">
  <div className="w-full 2md:w-1/2 flex flex-col 2md:flex-row gap-6">

    <div className="flex 2md:flex-col gap-4 overflow-x-auto 2md:overflow-x-visible max-w-full">
      <img
        src={productInfo?.mainImage.secure_url}
        onClick={() => setPreview(productInfo?.mainImage.secure_url)}
        className={`${preview===productInfo?.mainImage.secure_url?'border-primary' : 'border-transparent hover:border-gray-400'} w-20 h-20 object-cover rounded cursor-pointer border`}
        alt="main"

      />
      {productInfo?.subImages.map((image, idx) => (
        
        <img
          key={idx}
          src={image.secure_url}
          onClick={() => setPreview(image.secure_url)}
          className={`${preview===image.secure_url?'border-primary' : 'border-transparent hover:border-gray-400'} w-20 h-20 object-cover rounded cursor-pointer border`}
          alt={`sub-${idx}`}
        />
      ))}
    </div>

    {/* Preview Image */}
    <div className="flex-1">
      <img
        src={preview || productInfo?.mainImage.secure_url}
        className="w-full h-auto object-cover rounded"
        alt="preview"
      />
    </div>
  </div>

  {/* Right Column (Info) */}
  <div className="w-full 2md:w-1/2">
    <h2 className="text-2xl font-semibold mb-4">{productInfo?.name}</h2>
    <p className="text-gray-600">{productInfo?.description}</p>
  </div>
</div>

</>)
}

export default ProductDescription;
