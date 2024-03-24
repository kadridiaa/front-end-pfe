import React, { useState } from "react";
import Dashboard from "../component/Dashboard"; // Importez votre composant Dashboard
import Addresses from "../component/Addresses";
import AccountDetails from "../component/AccountDetails";
import WishList from "../component/WishList";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const [selectedItem, setSelectedItem] = useState("TABLEAU DE BORD");

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <div>
      <div className="w-full bg-gray-600/30 text-2xl font-[500] flex justify-center text-gray-600 py-4">
        <p className="w-[65%]">{selectedItem}</p>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-[70%] flex">
          <div className="w-[30%] py-3 mt-3 border-r-[1px] border-gray-300">
            <div className="flex items-center mb-4 justify-between">
              <FaUserCircle size={90} className="text-gray-300" />
              <h1 className="pr-6">Diaa</h1>
            </div>
            <ul className="mt-2 text-gray-500 text-sm font-[500] ">
              <li
                className={`border-b-[1px] ${
                  selectedItem === "TABLEAU DE BORD" ? "border-red-400 border-r-[3px] border-b-0" : ""
                } border-gray-300 flex text-center items-center justify-between py-4 cursor-pointer transition-colors duration-500`}
                onClick={() => handleItemClick("TABLEAU DE BORD")}
              >
                <p>TABLEAU DE BORD</p>
                {selectedItem === "TABLEAU DE BORD" && (
                  <div
                    className="h-full "
                    style={{ width: "4px", animation: "fadeIn 2s" }}
                  />
                )}
              </li>
              <li
                className={`border-b-[1px] ${
                  selectedItem === "ADRESSES" ? "border-red-400 border-r-[3px] border-b-0" : ""
                } cursor-pointer  border-gray-300 flex text-center items-center justify-between py-4 transition-colors duration-500`}
                onClick={() => handleItemClick("ADRESSES")}
              >
                <p>ADRESSES</p>
                {selectedItem === "ADRESSES" && (
                  <div
                    className="h-full "
                    style={{ width: "4px", animation: "fadeIn 2s" }}
                  />
                )}
              </li>
              <li
                className={`border-b-[1px] ${
                  selectedItem === "DETAILS DU COMPTE" ? "border-red-400 border-r-[3px] border-b-0" : ""
                } cursor-pointer border-gray-300 flex text-center items-center justify-between py-4 transition-colors duration-500`}
                onClick={() => handleItemClick("DETAILS DU COMPTE")}
              >
                <p>DETAILS DU COMPTE</p>
                {selectedItem === "DETAILS DU COMPTE" && (
                  <div
                    className="h-full "
                    style={{ width: "4px", animation: "fadeIn 2s" }}
                  />
                )}
              </li>
              <li
                className={`border-b-[1px]  gray-300 ${
                  selectedItem === "WISHLIST" ? "border-red-400 border-r-[3px] border-b-0" : ""
                } cursor-pointer  border-gray-300 flex text-center items-center justify-between py-4 transition-colors duration-500`}
                onClick={() => handleItemClick("WISHLIST")}
              >
                <p>WISHLIST</p>
                {selectedItem === "WISHLIST" && (
                  <div
                    className="h-full "
                    style={{ width: "4px", animation: "fadeIn 2s" }}
                  />
                )}
              </li>
              <li
                className={`border-gray-300 ${
                  selectedItem === "DECONNEXION" ? "border-red-400 border-r-[3px] border-b-0" : ""
                } flex cursor-pointer text-center items-center justify-between py-4 transition-colors duration-500`}
                onClick={() => handleItemClick("DECONNEXION")}
              >
                <p>DECONNEXION</p>
                {selectedItem === "DECONNEXION" && (
                  <div
                    className="h-full "
                    style={{ width: "4px", animation: "fadeIn 2s" }}
                  />
                )}
              </li>
            </ul>
          </div>
        
          {selectedItem === "TABLEAU DE BORD" && <Dashboard />}
          {selectedItem === "ADRESSES" && <Addresses />}
          {selectedItem === "DETAILS DU COMPTE" && <AccountDetails />}
          {selectedItem === "WISHLIST" && <WishList />}
         
        </div>
      </div>
    </div>
  );
}

export default Profile;