import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../types/productTypes";
import UseCart from "../../hooks/useCart";
import { useGetProductsQuery } from "../../features/api/productsApi";

const Products = () => {
  const { data, isLoading, isError } = useGetProductsQuery({ page: 1, limit: 8 });
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { addProduct } = UseCart();

  const allproducts = data?.products || [];

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored) as Product[]);
    }
  }, []);

  const toggleFavorite = (product: Product) => {
    const isFavorite = favorites.some((fav) => fav._id === product._id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav._id !== product._id)
      : [...favorites, product];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleAddProduct = async (product: Product, quantity: number) => {
    if (!product._id) {
      console.error("Product ID is missing!");
      return;
    }
    await addProduct(product, quantity);
  };

  const handleProduct = (productId: string, slug: string, categoryId: string): void => {
    navigate(`/products/${categoryId}/${slug}`, { state: { productId } });
  };

  if (isLoading) return <div className="text-center py-10">Loading products...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load products.</div>;

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row items-center gap-4 mb-5">
        <img src="../../../src/assets/Rectangle 18 (1).svg" alt="header" />
        <h2 className="text-primary text-base font-semibold">Our Products</h2>
      </div>

      <h3 className="text-4xl font-semibold">Explore Our Products</h3>

      <div className="flex flex-col items-center">
        <div className="items-center grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 mt-14 w-full max-w-7xl">
          {allproducts.map((product) => (
            <div key={product._id} className="p-4 text-start">
              <div className="relative group">
                <div className="absolute top-2 right-2 flex flex-col items-center gap-2">
                  <img
                    src={
                      favorites.some((fav) => fav._id === product._id)
                        ? "../../../src/assets/Fill Heart (1).svg"
                        : "../../../src/assets/Fill Heart.svg"
                    }
                    alt="fav"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                  />
                  <img
                    src="../../../src/assets/Fill Eye.svg"
                    alt="eye"
                    className="cursor-pointer"
                    onClick={() => handleProduct(product._id, product.slug, product.categoryId)}
                  />
                </div>

                <div className="absolute top-2 left-2 flex flex-col items-center">
                  {product.discount > 0 && (
                    <div className="bg-primary px-3 py-1 rounded text-white">
                      -{product.discount}%
                    </div>
                  )}
                </div>

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
              <div className="flex justify-items-center items-center gap-2 text-base text-primary">
                <div className="line-through text-gray-500">${product.price}</div>
                <div className="text-xl text-green-600">${product.finalPrice}</div>

                <div className="flex items-center">
                  {Array.from({ length: Math.min(product.avgRating, 5) }).map((_, i) => (
                    <span key={i}><img src="../../../src/assets/Vector (5).svg" alt="star" /></span>
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
    </div>
  );
};

export default Products;
