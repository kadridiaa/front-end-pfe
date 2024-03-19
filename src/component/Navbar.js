import React, { useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

import logo from "../pictures/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className={isMenuOpen ? "bg-red-600 bg-opacity-50 fixed top-0 left-0 h-screen w-full z-10 transition-opacity duration-500" : ""} onClick={toggleMenu}></div>
      <div className="flex items-center justify-between m-4">
        <div className="flex items-center justify-center" onClick={toggleMenu}>
          <IoMdMenu color="gray" size={30} />
          <div>
            <p className="text-gray-500 font-bold px-1 hidden md:flex">
              MENU
            </p>
          </div>
        </div>
        {/* <div>{logo}</div> */}
        <div className="flex items-center gap-2">
          <MdFavorite color="gray" size={26} />
          <RiAccountCircleFill color="gray" size={26} />
        </div>
      </div>
      <div className={`bg-white fixed top-0 left-0 h-screen shadow-2xl w-[68%] z-20 ${isMenuOpen ? "opacity-100 transition-opacity duration-500" : "opacity-0 pointer-events-none"}`}>
        <select className="w-full p-4">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div className="bg-gray-300 bg-opacity-50 flex h-12">
        <div className="flex items-center justify-center w-full mx-1">
          <input
            type="text"
            className="w-[90%] py-1 px-2 outline-none border-gray-100 border-1"
            placeholder="Search ..."
          />
          <div className="bg-black">
            <IoSearch color="white" size={29} className="p-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
