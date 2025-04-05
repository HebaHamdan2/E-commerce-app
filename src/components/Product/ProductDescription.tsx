import { useEffect, useState } from "react";
import UseSpecificProduct from "../../hooks/useSpecificProduct";
import { Link } from "react-router-dom";
import UseAddToCart from "../../hooks/useAddToCart";

type Props = {
    productId: string;
  };
const ProductDescription = ({productId}:Props) => {
    const {getProduct,productInfo}=UseSpecificProduct();
    const {addProduct}=UseAddToCart()
    let [quentity,setQuant]=useState<number>(1)
    const [favorites, setFavorites] = useState<string[]>([]);
    let [preview,setPreview]=useState<string | undefined>('')
    useEffect(()=>{
        getProduct(productId);
        const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    },[])
    const handleAddToCart=()=>{
addProduct(productId,quentity);
    }
    const handeldecrement=()=>{
      if(quentity>1){
        setQuant((q)=>q-1);
      }
    }
    const handelIncrement=()=>{
      if((productInfo?.stock??0)>quentity){
        setQuant((q)=>q+1);
      }
    }
    const toggleFavorite = (productId: string) => {
      const updatedFavorites = favorites.includes(productId)
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId];
    
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    return (
<><div className="flex flex-row pt-20 pb-20">
  <Link to="/" className="text-primaryText opacity-50">Home / </Link>
  <span className="cursor-pointer">{productInfo?.name}</span> 
</div>

<div className="flex flex-col 2md:flex-row 2md:gap-12 gap-16">
  <div className="w-full 2md:w-2/3 flex flex-col 2md:flex-row gap-6">

    <div className="flex 2md:flex-col gap-4 overflow-x-auto 2md:overflow-x-visible max-w-full">
      <img
        src={productInfo?.mainImage.secure_url}
        onClick={() => setPreview(productInfo?.mainImage.secure_url)}
        className={`${preview===productInfo?.mainImage.secure_url?'border-primary' : 'border-transparent hover:border-gray-400'} w-28 h-28 object-cover rounded cursor-pointer border`}
        alt="main"

      />
      {productInfo?.subImages.map((image, idx) => (
        
        <img
          key={idx}
          src={image.secure_url}
          onClick={() => setPreview(image.secure_url)}
          className={`${preview===image.secure_url?'border-primary' : 'border-transparent hover:border-gray-400'} w-28 h-28 object-cover rounded cursor-pointer border`}
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
  <div className="w-full 2md:w-1/3">
    <h2 className="text-2xl font-semibold mb-4">{productInfo?.name}</h2>
    <span className="text-primaryText opacity-50 text-sm">{productInfo?.avgRating}</span><span className="text-primaryText opacity-50 text-sm"> ({productInfo?.reviews.length}) | </span>{(productInfo?.stock ?? 0)>0?<span className="text-[#00FF66] text-sm"> In Stock</span>:<span className="text-sm text-primary"> Sold Out</span>}
    <h3 className="text-primaryText text-2xl mt-4 mb-6">${productInfo?.price}</h3>
    <p className="text-sm text-primaryText">{productInfo?.description}</p>

  {/* Quantity Controller */}
  <div className="flex items-center px-4 py-2 mt-6">
    <img
      src="../../../src/assets/minus.svg"
      alt="minus"
      onClick={handeldecrement}
      className={`w-10 h-10 ${quentity > 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
    />
    <p className="text-primaryText text-xl font-medium px-6">{quentity}</p>
    <img
      src="../../../src/assets/plus.svg"
      alt="plus"
      onClick={handelIncrement}
      className={`w-10 h-10  ${quentity < (productInfo?.stock ?? 0) ? "cursor-pointer" : "cursor-not-allowed"}`}
    />
  </div>
  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-6">
  {/* Add to Cart Button */}
  <img
    src="../../../src/assets/Button.svg"
    alt="add"
    onClick={handleAddToCart}
    className="w-full sm:w-auto max-w-xs cursor-pointer"
  />

  {/* Favorite Icon */}
  <img
    src={favorites.includes(productId)
      ? "../../../src/assets/Frame 904 (1).svg"
      : "../../../src/assets/Frame 904.svg"}
    alt="fav"
    onClick={() => toggleFavorite(productId)}
    className="w-10 h-10 cursor-pointer"
  />
</div>

   
  </div>
</div>

</>)
}

export default ProductDescription;
