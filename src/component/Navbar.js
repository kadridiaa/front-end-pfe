import React, { useState, useRef } from "react";
import logo from "./logo.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <div className="w-full py-4 bg-gray-400/55 flex items-centers justify-between px-20">
      <img src={logo} alt="" />
      <div className="flex items-center mr-8 font-[600] font-sans  text-xl">
        <div className="list-container">
          <ul className="flex px-10 font-[700]">
            <li className={`px-6 ${location.pathname === "/" ? "active" : ""}`}>
              <Link to="/">Home</Link>
            </li>
            <li
              className={`px-6 ${
                location.pathname === "/shop" ? "active" : ""
              }`}
            >
              <Link to="/shop">Shop</Link>
            </li>
            <li
              className={`px-6 ${
                location.pathname === "/blog" ? "active" : ""
              }`}
            >
              <Link to="/blog">Blog</Link>
            </li>
            <li
              className={`px-6 ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link to="/about">About</Link>
            </li>
            <li
              className={`px-6 ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              <Link to="/contact">Contact</Link>
            </li>
            
          </ul>
        </div>

        <IoNotificationsOutline />
      </div>
    </div>
  );
}

export default Navbar;
