import React, { useState, useEffect } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoNotificationsCircle } from "react-icons/io5";
import logo from "../pictures/logo.png";

function Navbar({ onCategoryClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submission of comment here
    console.log("Comment submitted:", comment);
    // Optionally, you can clear the comment input after submission
    setComment("");
    // Close the popover
    setIsPopoverOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const authToken = Cookies.get("authToken");
    setIsLoggedIn(authToken ? true : false);
    console.log(isLoggedIn, authToken); // Set isLoggedIn based on the presence of authToken
  });

  const handleFavoriteClick = () => {
    if (isLoggedIn) {
      // Rediriger vers la liste de souhaits si l'URL est différente de la liste de souhaits
      navigate("/Profile/WishList");
    } else {
      // Afficher le composant de connexion
      setIsModalOpen(true);
    }
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
            onClick={togglePopover}
          >
            Contact
          </li>
          {isPopoverOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-4 w-[50%]  rounded-lg shadow-xl">
                <h1 className="text-xl font-bold text-black py-2" >Contacter nous : </h1>
                <textarea
                  className="w-full h-64 border border-gray-300 rounded-md resize-none mb-4 px-2 py-1"
                  placeholder="Enter your comment..."
                  value={comment}
                  onChange={handleCommentChange}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
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
      <div className="flex items-center justify-between lg:justify-evenly lg:w-[90%] my-4">
        <div className="hidden lg:flex lg:justify-center ">
          <img src={logo} className="w-20" />
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
          {isLoggedIn ? (
            <Link to="/Profile/WishList">
              <MdFavorite
                color="gray"
                size={26}
                onClick={handleFavoriteClick}
              />
            </Link>
          ) : (
            <MdFavorite color="gray" size={26} onClick={handleFavoriteClick} />
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/Profile">
                <RiAccountCircleFill
                  color="gray"
                  size={26}
                  className="cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <RiAccountCircleFill
              color="gray"
              size={26}
              className="cursor-pointer"
              onClick={toggleModal}
            />
          )}
          <IoIosNotifications
            color="gray"
            size={26}
            onClick={toggleNotificationPanel}
          />

          {isNotificationPanelOpen && (
            <div className="bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-full z-10"></div>
          )}
          <div
            className={
              isNotificationPanelOpen
                ? "bg-red-600 bg-opacity-50 fixed top-0 left-0 h-screen w-full z-20 transition-opacity duration-500"
                : ""
            }
            onClick={toggleNotificationPanel}
          ></div>
        </div>
      </div>
      {isModalOpen && !isLoggedIn && <Login onClose={toggleModal} />}
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
            <Link to="/?type=men">
              {" "}
              <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
                HOMME
              </li>
            </Link>
            <Link to="?type=women">
              {" "}
              <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
                FEMME
              </li>
            </Link>
            <Link to="?type=children">
              {" "}
              <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
                ENFANT
              </li>
            </Link>
            <Link to="/">
              {" "}
              <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
                BOUTIQUE
              </li>
            </Link>
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2">
              A PROPOS
            </li>
            <li></li>
          </ul>
        </div>
      </div>
      <div
        className={`bg-white fixed top-0 right-0 h-screen shadow-2xl w-[68%] lg:w-[28%] z-30 ${
          isNotificationPanelOpen
            ? "opacity-100 transition-opacity duration-500"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div>
          <div className="flex justify-end m-4">
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={toggleNotificationPanel}
            >
              <BiX size={24} />
            </button>
          </div>
          <ul className="m-6 pt-10 text-gray-500 text-[15px] font-[500]">
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <IoNotificationsCircle size={30} className="mx-2" />
              <div>
                le Produit :{" "}
                <span className="font-bold text-red-500">tshirt bleu</span> est
                disponbile avec le prix :<div>23000</div>
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <IoNotificationsCircle size={42} className="mx-2" />
              <div>
                le Produit :{" "}
                <span className="font-bold text-red-500">
                  pontalon pour les enfants noire
                </span>{" "}
                est disponbile avec le prix :<div>23000</div>
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <IoNotificationsCircle size={30} className="mx-2" />
              <div>
                le Produit :{" "}
                <span className="font-bold text-red-500">
                  casquette 40 size
                </span>{" "}
                est disponbile avec le prix :<div>23000</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-300 bg-opacity-50 flex h-12">
        <ul className="hidden lg:flex justify-center w-full gap-6 text-gray-500">
          <Link to="/">
            {" "}
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
              BOUTIQUE
            </li>
          </Link>
          <Link to="/?type=men">
            {" "}
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
              HOMME
            </li>
          </Link>
          <Link to="?type=women">
            {" "}
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
              FEMME
            </li>
          </Link>
          <Link to="?type=children">
            {" "}
            <li className="flex text-center  items-center justify-between py-4 border-gray-200 border-b-2 cursor-pointer">
              ENFANT
            </li>
          </Link>
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
