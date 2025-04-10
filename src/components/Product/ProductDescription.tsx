import { useEffect, useState } from "react";
import UseSpecificProduct from "../../hooks/useSpecificProduct";
import { Link } from "react-router-dom";
import UseAddToCart from "../../hooks/useCart";
import { Product } from "../../types/productTypes";

type Props = {
  productId: string;
};

const ProductDescription = ({ productId }: Props) => {
  const { getProduct, productInfo } = UseSpecificProduct();
  const { addProduct } = UseAddToCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    getProduct(productId);
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, [productId]);

  const handleAddProduct = async (product: Product, quantity: number) => {
    if (!product._id) {
      console.error("Product ID is missing!");
      return;
    }
    await addProduct(product, quantity); 
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleIncrement = () => {
    if ((productInfo?.stock ?? 0) > quantity) setQuantity((q) => q + 1);
  };

  const toggleFavorite = (product: Product | undefined) => {
    if (!product) return;
  
    const isFavorite = favorites.some((fav) => fav._id === product._id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav._id !== product._id)
      : [...favorites, product];
  
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Ensure productInfo is loaded before rendering buttons
  const handleAddToCartClick = () => {
    if (productInfo) {
      handleAddProduct(productInfo, quantity);
    }
  };

  return (
    <>
      <div className="flex flex-row pt-20 pb-20">
        <Link to="/" className="text-primaryText opacity-50">
          Home /
        </Link>
        <span className="cursor-pointer">{productInfo?.name}</span>
      </div>

      <div className="flex flex-col 2md:flex-row 2md:gap-12 gap-16">
        <div className="w-full 2md:w-2/3 flex flex-col 2md:flex-row gap-6">
          {/* Image Thumbnails */}
          <div className="flex 2md:flex-col gap-4 overflow-x-auto 2md:overflow-x-visible max-w-full">
            <img
              src={productInfo?.mainImage?.secure_url}
              onClick={() =>
                setPreview(productInfo?.mainImage?.secure_url ?? "")
              }
              className={`${
                preview === productInfo?.mainImage?.secure_url
                  ? "border-primary"
                  : "border-transparent hover:border-gray-400"
              } w-28 h-28 object-cover rounded cursor-pointer border`}
              alt="main"
            />
            {productInfo?.subImages.map((image, idx) => (
              <img
                key={idx}
                src={image.secure_url}
                onClick={() => setPreview(image.secure_url)}
                className={`${
                  preview === image.secure_url
                    ? "border-primary"
                    : "border-transparent hover:border-gray-400"
                } w-28 h-28 object-cover rounded cursor-pointer border`}
                alt={`sub-${idx}`}
              />
            ))}
          </div>

          {/* Preview Image */}
          <div className="flex-1">
            <img
              src={preview || productInfo?.mainImage?.secure_url}
              className="w-full h-auto object-cover rounded"
              alt="preview"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full 2md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">{productInfo?.name}</h2>

          {/* Rating & Stock */}
          <div className="flex flex-row items-center">
            {Array.from({ length: 5 }).map((_, i) => {
              const rating = productInfo?.avgRating ?? 0;
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
            <span className="text-primaryText opacity-50 text-sm">
              ({productInfo?.reviews.length}) |
            </span>
            {(productInfo?.stock ?? 0) > 0 ? (
              <span className="text-[#00FF66] text-sm pl-1"> In Stock</span>
            ) : (
              <span className="text-sm text-primary pl-1"> Sold Out</span>
            )}
          </div>

          <h3 className="text-primaryText text-2xl mt-4 mb-6">
            ${productInfo?.price}
          </h3>
          <p className="text-sm text-primaryText">
            {productInfo?.description}
          </p>
          <div className="flex items-center px-4 py-2 mt-6">
            <img
              src="../../../src/assets/minus.svg"
              alt="minus"
              onClick={handleDecrement}
              className={`w-10 h-10 ${quantity > 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
            />
            <p className="text-primaryText text-xl font-medium px-6">
              {quantity}
            </p>
            <img
              src="../../../src/assets/plus.svg"
              alt="plus"
              onClick={handleIncrement}
              className={`w-10 h-10 ${quantity < (productInfo?.stock ?? 0) ? "cursor-pointer" : "cursor-not-allowed"}`}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-6">
            <img
              src="../../../src/assets/Button.svg"
              alt="add"
              onClick={handleAddToCartClick}
              className="w-full sm:w-auto max-w-xs cursor-pointer"
            />
            <img
              src={
                favorites.some((fav) => fav._id === productInfo?._id)
                  ? "../../../src/assets/Frame 904 (1).svg"
                  : "../../../src/assets/Frame 904.svg"
              }
              alt="fav"
              onClick={() => toggleFavorite(productInfo)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>

          {/* Info Frame */}
          <div className="mt-10">
            <img src="../../../src/assets/Frame 911.svg" alt="info" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
