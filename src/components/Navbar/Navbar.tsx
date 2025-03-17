import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        } 2md:flex items-center flex-col 2md:flex-row absolute 2md:static top-[80px] bg-white px-[30%]  py-3 left-0 shadow 2md:p-0 2md:shadow-none`}
      >
        <ul className="flex flex-col 2md:flex-row gap-4 items-center justify-center">
          <li>
            <img src="../../../src/assets/Vector.svg" alt="fav" />
          </li>
          <li>
            <img src="../../../src/assets/Cart.svg" alt="cart" />
          </li>
          <li>
            <img src="../../../src/assets/user.svg" alt="user" />
          </li>
          <li className="text-primaryText font-normal text-base ">Sign Up</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
