import { Link } from "react-router-dom";

const Products = () => {
    return (
        <div className="flex flex-col mt-10">
        <div className="flex flex-row items-center gap-4 mb-5">
            <img src="../../../src/assets/Rectangle 18 (1).svg" alt="header" />
            <h2 className="text-primary text-base font-semibold">Our Products</h2>
        </div>
            <h3 className="text-4xl font-semibold">Explore Our Products</h3>
             
       <div className="flex flex-col items-center">
       <div className="items-center grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 mt-14">
          
          <div className="p-4 border rounded-md text-center">
            textlkjjjj'"jllllllllllllllllllll"
          </div>
          <div className="p-4 border rounded-md text-center">
          textlkjjjj'"jllllllllllllllllllll"
          </div>
          <div className="p-4 border rounded-md text-center">
          textlkjjjj'"jllllllllllllllllllll"
          </div>
          <div className="p-4 border rounded-md text-center">
          textlkjjjj'"jllllllllllllllllllll"
          </div>
          <div className="p-4 border rounded-md text-center">
          textlkjjjj'"jllllllllllllllllllll"
          </div>
          <div className="p-4 border rounded-md text-center">
          textlkjjjj'"jllllllllllllllllllll"
          </div>
          <div className="p-4 border rounded-md text-center">
          textlkjjjj'"jllllllllllllllllllll"
          </div>
          <div className="p-4 border rounded-md text-center">
          textlkjjjj'"jllllllllllllllllllll"
          </div>

 
  </div>
  <div >
  <Link to={'/products'} className=" text-base font-medium text-white bg-primary rounded py-4 px-12">View All Products</Link>  
  </div>
          
       </div>
       
       
       
           
    </div>
    );
}

export default Products;
