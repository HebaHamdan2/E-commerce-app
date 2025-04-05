import { Link, useNavigate } from "react-router-dom";
import UseProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import UseAddToCart from "../../hooks/useAddToCart";

const Products = () => {
    const { allproducts, getProducts } = UseProducts();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<string[]>([]);
    const {addProduct}=UseAddToCart();
    useEffect(() => {
        getProducts(1, 8);
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }, []);
    const toggleFavorite = (productId: string) => {
        const updatedFavorites = favorites.includes(productId)
          ? favorites.filter((id) => id !== productId)
          : [...favorites, productId];
      
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      };
      const handleAddProduct=(productId:string,quant:number):void=>{
        addProduct(productId,quant)
      }
      

    const handleProduct = (productId: string,slug:string): void => {
      navigate(`/products/${slug}`, { state: { productId } });
    };

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
                        <div
                            key={product._id}
                            className="p-4   text-start  "
    
                        >
                            <div className="relative group">
                            
                            <div className="absolute top-2 right-2 flex flex-col items-center gap-2">
                            <img
    src={
      favorites.includes(product._id)
        ? "../../../src/assets/Fill Heart (1).svg" // <-- filled heart
        : "../../../src/assets/Fill Heart.svg"  // <-- empty heart
    }
    alt="fav"
    className="cursor-pointer"
    onClick={(e) => {
      e.stopPropagation(); 
      toggleFavorite(product._id);
    }}
  />  <img src="../../../src/assets/Fill Eye.svg" alt="eye"  className="cursor-pointer"  onClick={() => handleProduct(product._id,product.slug)} />
</div>


                            <img
                                src={product.mainImage.secure_url}
                                alt="product"
                                className="w-full h-52 object-cover mb-2 rounded"
                            />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-100 top-40 transition-opacity h-10 rounded text-center pt-2 pb-2 cursor-pointer text-white"onClick={()=>handleAddProduct(product._id,1)}  >Add To Cart</div>
                      
                            </div>
                                  <div className="font-medium mb-1">{product.name}</div>
                            <div className="flex justify-items-center items-center gap-2 text-base text-primary">
                                <div>${product.price}</div>
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

                <div>
                    <Link
                        to="/products"
                        className="text-base font-medium text-white bg-primary rounded py-4 px-12"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Products;
