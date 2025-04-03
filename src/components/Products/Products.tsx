import { Link, useNavigate } from "react-router-dom";
import UseProducts from "../../hooks/useProducts";
import { useEffect } from "react";

const Products = () => {
    const { allproducts, getProducts } = UseProducts();
    const navigate=useNavigate()
    useEffect(() => {
        getProducts(1, 8);
    }, []);
    const handleProduct=(productId:string):void=>{
        navigate(`/products/${productId}`);
    }
    return (
        <div className="flex flex-col mt-10">
        <div className="flex flex-row items-center gap-4 mb-5">
            <img src="../../../src/assets/Rectangle 18 (1).svg" alt="header" />
            <h2 className="text-primary text-base font-semibold">Our Products</h2>
        </div>
            <h3 className="text-4xl font-semibold">Explore Our Products</h3>
             
       <div className="flex flex-col items-center">
       <div className="items-center grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 mt-14">
         {allproducts.map((product)=>
          <div className="p-4 border rounded-md text-center cursor-pointer" onClick={()=>handleProduct(product._id)}>
            <img src={product.mainImage.secure_url} alt="product" />
{product.name}       
<div className="flex flex-row ">
    <div>
        {product.price}
    </div>
    <div>
       stars
    </div>
</div>
 </div>
        )} 
         

  </div>
  <div >
  <Link to={'/products'} className=" text-base font-medium text-white bg-primary rounded py-4 px-12">View All Products</Link>  
  </div>
          
       </div>
       
       
       
           
    </div>
    );
}

export default Products;
