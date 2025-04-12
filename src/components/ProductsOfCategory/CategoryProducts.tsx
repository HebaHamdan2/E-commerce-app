import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseCategories from '../../hooks/useCtegories';
import { Product } from '../../types/productTypes';
import UseAddToCart from '../../hooks/useCart';
import AuthContext from '../../context/AuthContext';

const CategoryProducts = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
      const auth = useContext(AuthContext);
    
    const [favorites, setFavorites] = useState<Product[]>([]);
    const {addProduct}=UseAddToCart();
    let {getProductsByCategory,products}=UseCategories()
    useEffect(() => {
        if (categoryId) getProductsByCategory(categoryId);
      }, [categoryId]);
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
        
          const handleAddProduct=(product:Product,quant:number):void=>{
            addProduct(product,quant)
          }
          
    
        const handleProduct = (productId: string,slug:string,categoryId:string): void => {
          navigate(`/products/${categoryId}/${slug}`, { state: { productId } });
        };
    return (
        <div className='wrapper'>
           <div className="flex flex-col items-center">
                <div className="items-center grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 mt-14 w-full max-w-7xl">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="p-4   text-start  "
    
                        >
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
<img src="../../../src/assets/Fill Eye.svg" alt="eye"  className="cursor-pointer"  onClick={() => handleProduct(product._id,product.slug,product.categoryId)} />
</div>

<div className="absolute top-2 left-2 flex flex-col items-center">
                {product.discount>0&&
                 <div className="bg-primary px-3 py-1 rounded text-white">
                 -{product.discount}%
               </div>}
                </div>
                            <img
                                src={product.mainImage.secure_url}
                                alt="product"
                                className="w-full h-52 object-cover mb-2 rounded"
                            />
{auth?.isAuthenticated&&( <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-100 top-40 transition-opacity h-10 rounded text-center pt-2 pb-2 cursor-pointer text-white"onClick={()=>handleAddProduct(product,1)}  >Add To Cart</div>
                      )}
                             
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

                <div>
                  
                </div>
            </div>
        </div>
    );
}

export default CategoryProducts;
