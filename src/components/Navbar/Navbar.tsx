import {  useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UseCart from "../../hooks/useCart";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const auth=useContext(AuthContext);
  const {getCart}=UseCart()
 let [favLength,setFavLength]=useState(0);
 useEffect(() => {
  const handleStorageChange = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavLength(favs.length);
  };

  window.addEventListener("storage", handleStorageChange);
  handleStorageChange(); // run once on mount

  return () => window.removeEventListener("storage", handleStorageChange);
}, []);
useEffect(() => {
  if (auth?.isAuthenticated && auth.user?.token) {
    getCart();
  }
}, [auth?.isAuthenticated, auth?.user?.token]);
   
  return (
    <div className="wrapper mt-10 mb-4 flex justify-between items-center  ">
      <Link to={"/"}>
        <img src="../../../src/assets/Exclusive.svg" alt="logo" />
      </Link>

      {/* Toggle Button for Mobile */}
      <div
        className="block 2md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
       {!menuOpen? <img  src="../../../src/assets/Menu.svg" alt="menu" />: <img  src="../../../src/assets/close.svg" alt="close" />}
      </div>

      {/* Menu Items */}
      <div
  className={`${
    menuOpen ? "block" : "hidden"
  } 2md:flex items-center flex-col 2md:flex-row absolute 2md:static top-[80px] bg-white px-[30%] py-3 left-0 shadow 2md:p-0 2md:shadow-none z-50`}
>
        <ul className="flex flex-col 2md:flex-row gap-4 items-center justify-center ">
          <li role="button" className="btn btn-ghost btn-circle relative ">
            <Link to={'/whishlist'}>
            <img src="../../../src/assets/Vector.svg" alt="fav" />
            </Link>
     <div className="absolute rounded-full bg-primary text-xs w-4 h-4 flex items-center justify-center text-white top-1 right-1">
  {favLength}
</div>

          </li>
          <li role="button" className="relative btn btn-ghost btn-circle">
  <Link to="/cart">
    <img src="../../../src/assets/Cart.svg" alt="cart" />
    {cart.length > 0 && (
      <div className="absolute top-0 right-0 bg-primary text-xs w-4 h-4 flex items-center justify-center text-white rounded-full">
        {cart.length}
      </div>
    )}
  </Link>
</li>

          <li>
            {auth?.isAuthenticated&&
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                      <img src="../../../src/assets/user.svg" alt="user" className="w-6 h-6" /> 
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                      <li>
                        <Link to={'/account'} className="flex items-center gap-3 px-3 py-2">
                          <img src="../../../src/assets/user (2).svg" alt="account" className="w-5 h-5" /> 
                          <span>Manage My Account</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/orders'} className="flex items-center gap-3 px-3 py-2">
                          <img src="../../../src/assets/Group.svg" alt="orders" className="w-5 h-5" /> 
                          <span>My Orders</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/reviews'} className="flex items-center gap-3 px-3 py-2">
                          <img src="../../../src/assets/Vector (4).svg" alt="reviews" className="w-5 h-5" /> 
                          <span>My Reviews</span>
                        </Link>
                      </li>
                      <li>
                        <button className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-100" onClick={auth?.logout} >
                          <img src="../../../src/assets/Vector (3).svg" alt="logout" className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>}
  

          </li>  
          {!auth?.isAuthenticated&&
             <NavLink to={'/signup'}  className={({ isActive }) => 
              `text-primaryText font-normal text-base ${isActive ? 'underline' : ''}`
            }><li>Sign Up</li></NavLink>}
 

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
