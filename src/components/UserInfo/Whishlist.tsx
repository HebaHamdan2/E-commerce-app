import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/productTypes";
import UseAddToCart from "../../hooks/useCart";

const Wishlist = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addProduct } = UseAddToCart();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
    setTimeout(() => {
      setLoading(false); // Simulate loading (remove this in real API calls)
    }, 800);
  }, []);

  const handleProduct = (productId: string, slug: string) => {
    navigate(`/products/${productId}/${slug}`, { state: { productId } });
  };

  const handleDelete = (product: Product) => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== product._id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleAddProduct = (product: Product, quant: number): void => {
    addProduct(product, quant);
  };

  const SkeletonCard = () => (
    <div className="p-4 animate-pulse">
      <div className="w-full h-52 bg-gray-300 rounded mb-4" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/4" />
    </div>
  );

  return (
    <>
      <div className="flex flex-row mt-24 text-xl font-normal mb-16">
        Wishlist ({favorites.length})
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 mt-14 w-full max-w-7xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 mt-14 w-full max-w-7xl">
            {favorites.map((product) => (
              <div key={product._id} className="p-4 text-start">
                <div className="relative group">
                  <div className="absolute top-2 right-2 flex flex-col items-center gap-2">
                    <img
                      src="../../../src/assets/Frame 568.svg"
                      alt="delete"
                      className="cursor-pointer"
                      onClick={() => handleDelete(product)}
                    />
                    <img
                      src="../../../src/assets/Fill Eye.svg"
                      alt="eye"
                      className="cursor-pointer"
                      onClick={() => handleProduct(product._id, product.slug)}
                    />
                  </div>

                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 flex flex-col items-center">
                      <div className="bg-primary px-3 py-1 rounded text-white">
                        -{product.discount}%
                      </div>
                    </div>
                  )}

                  <img
                    src={product.mainImage.secure_url}
                    alt="product"
                    className="w-full h-52 object-cover mb-2 rounded"
                  />

                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-100 top-40 transition-opacity h-10 rounded text-center pt-2 pb-2 cursor-pointer text-white"
                    onClick={() => handleAddProduct(product, 1)}
                  >
                    Add To Cart
                  </div>
                </div>

                <div className="font-medium mb-1">{product.name}</div>

                <div className="flex flex-wrap items-center gap-2 text-base text-primary">
                  <div className="line-through text-gray-500">${product.price}</div>
                  <div className="text-xl text-green-600">${product.finalPrice}</div>

                  <div className="flex items-center">
                    {Array.from({ length: Math.min(product.avgRating, 5) }).map((_, i) => (
                      <span key={i}>
                        <img src="../../../src/assets/Vector (5).svg" alt="star" />
                      </span>
                    ))}
                  </div>

                  <div className="text-primaryText opacity-50">
                    ({product.reviews.length})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-center align-middle mb-96 text-4xl font-semibold">
          No Products Added to Your Wishlist Yet!
        </div>
      )}
    </>
  );
};

export default Wishlist;
