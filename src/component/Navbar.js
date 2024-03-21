import React, { useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BiX } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { MdOutlineMail } from "react-icons/md";
import Login from "./Login";
import logo from "../pictures/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="bg-red-600 justify-evenly py-1 hidden lg:flex">
        <div className="flex m-1 items-center">
          <FaFacebook color="white" size={22} className="px-1" />
          <FaInstagram color="white" size={22} className="px-1" />
          <ImLinkedin color="white" size={22} className="px-1" />
          <MdOutlineMail color="white" size={22} className="px-1" />
        </div>
        <ul className="flex items-center text-gray-300 text-[14px]">
          <li
            className="px-2 cursor-pointer hover:text-white hover:duration-1000"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            Qui sommes nous
          </li>
          <li
            className="px-2 cursor-pointer hover:text-white hover:duration-1000"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            Nos Sites web
          </li>
          <li
            className="px-2 cursor-pointer hover:text-white hover:duration-1000"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            Contact
          </li>
          <li
            className="px-2 cursor-pointer hover:text-white hover:duration-1000"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            Conditions Generales
          </li>
        </ul>
      </div>
      <div
        className={`bg-black bg-opacity-40 fixed top-[162px] shadow-2xl left-0 h-screen w-full z-20 transition-opacity duration-500 ${
          isHovered ? "" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {isMenuOpen && (
        <div className="bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-full z-10"></div>
      )}
      <div
        className={
          isMenuOpen
            ? "bg-red-600 bg-opacity-50 fixed top-0 left-0 h-screen w-full z-20 transition-opacity duration-500"
            : ""
        }
        onClick={toggleMenu}
      ></div>
      <div className="flex items-center justify-between lg:justify-evenly lg:w-[90%] m-4">
        <div className="hidden lg:flex">
          logo
          {/* <img src={logo} className="" alt="" /> */}
        </div>
        <div className="flex items-center justify-center ">
          <div className="lg:hidden" onClick={toggleMenu}>
            <IoMdMenu color="gray" size={30} />
          </div>
          <div>
            <p className="text-gray-500 font-bold px-1 hidden md:flex lg:hidden">
              MENU
            </p>
          </div>
        </div>
        <div className=" bg-opacity-50 lg:flex h-11 hidden w-3/6">
          <div className="flex items-center justify-center w-full mx-1 lg:mx-1">
            <input
              type="text"
              className="w-full py-1 px-2 outline-none border-gray-300 border-2 "
              placeholder="Search ..."
            />
            <div className="bg-black">
              <IoSearch color="white" size={30} className="p-1" />
            </div>
          </div>
        </div>
        {/* <div>{logo}</div> */}
        <div className="flex items-center gap-2">
          <MdFavorite color="gray" size={26} />
          <RiAccountCircleFill
            color="gray"
            size={26}
            onClick={toggleModal}
            className="cursor-pointer"
          />
          <IoIosNotifications color="gray" size={26} />
        </div>
      </div>
      {isModalOpen && <Login onClose={toggleModal} />}
      <div
        className={`bg-white fixed top-0 left-0 h-screen shadow-2xl w-[68%] z-30 ${
          isMenuOpen
            ? "opacity-100 transition-opacity duration-500"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div>
          <div className="flex justify-end m-4">
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              <BiX size={24} />
            </button>
          </div>
          <ul className="m-6 pt-10 text-gray-500 text-[15px] font-[500]">
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
              HOMME
            </li>
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
              FEMME
            </li>
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
              ENFANT
            </li>
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
              BOUTIQUE
            </li>
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
              A PROPOS
            </li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-300 bg-opacity-50 flex h-12">
        <ul className="hidden lg:flex justify-center w-full gap-6 text-gray-500">
          <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
            BOUTIQUE
          </li>
          <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
            HOMME
          </li>
          <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
            FEMME
          </li>
          <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
            ENFANT
          </li>
        </ul>
        <div className="flex items-center justify-center w-full mx-1 lg:hidden">
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
