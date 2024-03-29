import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiAbacus, BiX } from "react-icons/bi";
import { MdOutlineFavorite } from "react-icons/md";
import Cookies from "js-cookie";

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [hoveredId, setHoveredId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // const toggleFavorite = (productId) => {
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.product_id === productId
  //         ? { ...item, isFavorite: !item.isFavorite }
  //         : item
  //     )
  //   );
  // };

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const fetchProducts = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/trier/${category}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const toggleFavorite = async (productId) => {
    if (!isLoggedIn) {
      console.log("Please log in to add to favorites");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/favoris/", {
        productId: productId,
      });
      console.log(response.data);
      // Update UI to indicate that the product is favorited
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col ">
      <div
        className={
          isFilterOpen
            ? "bg-gray-600 bg-opacity-50 fixed top-0 left-0 h-screen w-full z-10 transition-opacity duration-500"
            : ""
        }
        onClick={toggleFilter}
      ></div>
      <div className="lg:flex lg:items-center lg:w-full lg:justify-evenly ">
        <div className="flex items-center justify-center m-4 text-[20px] text-gray-400">
          <a href="">ACCEUIL</a>
          <a className="px-2" href="">
            /
          </a>
          <a href="">BOUTIQUE</a>
        </div>
        <div className="flex items-center justify-center lg:hidden">
          <BiAbacus size={22} color="gray" />
          <button
            className="px-2 text-[20px] font-medium text-gray-400"
            onClick={toggleFilter}
          >
            FILTRER
          </button>
        </div>
        {isFilterOpen && (
          <div
            className="bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-[68%] z-10"
            onClick={toggleFilter}
          ></div>
        )}
        <div
          className={`bg-white fixed top-0 left-0 h-screen shadow-2xl w-[68%] z-20 ${
            isFilterOpen
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Contenu de votre volet latéral */}
          <div className=" p-4">
            <div className="flex justify-end">
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={toggleFilter}
              >
                <BiX size={24} />
              </button>
            </div>
            <div className="my-2">
              <h2 className="text-[18px] font-bold text-gray-400">
                CATEGORIES DES PRODUITS
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li
                  className="flex text-center cursor-pointer items-center justify-between py-2"
                  onClick={() => handleCategoryClick("men")}
                >
                  <p>Homme</p>
                  <p className="text-[11px] pt-2">(999)</p>
                </li>
                <li
                  className="flex text-center items-center cursor-pointer  justify-between py-2"
                  onClick={() => handleCategoryClick("women")}
                >
                  <p>Femme</p>
                  <p className="text-[11px] pt-2">(999)</p>
                </li>
                <li
                  className="flex text-center items-center cursor-pointer justify-between py-2 "
                  onClick={() => handleCategoryClick("children")}
                >
                  <p>Enfant</p>
                  <p className="text-[11px] pt-2">(999)</p>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-[18px] font-bold text-gray-400">
                HUSKY FILTRE
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center items-center  py-2">
                  <input type="checkbox" id="option1" name="option1" />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 1
                  </label>
                </li>
                <li className="flex text-center items-center   py-2">
                  <input type="checkbox" id="option2" name="option2" />
                  <label
                    htmlFor="option2"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 2
                  </label>
                </li>
                <li className="flex text-center items-center   py-2">
                  <input type="checkbox" id="option3" name="option3" />
                  <label
                    htmlFor="option3"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 3
                  </label>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-[18px] font-bold text-gray-400">
                CHOiSIS SITEWEB
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option1"
                    name="option1"
                    className="rounded-full"
                  />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 1
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option2"
                    name="option2"
                    className="rounded-full"
                  />
                  <label
                    htmlFor="option2"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 2
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option3"
                    name="option3"
                    className="rounded-full"
                  />
                  <label
                    htmlFor="option3"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 3
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center m-4 ">
          <div className="hidden lg:flex pr-4">
            <h1 className="text-gray-500">
              Affichage de 1–20 sur 1399 résultats
            </h1>
          </div>
          <select className="appearance-none  bg-gray-200 border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option>Tri par prix</option>
            <option>Tri du plus recent</option>
          </select>
          <div className="pointer-events flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-6-6-1 1 7 7 7-7-1-1-6 6z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full lg:w-[70%] flex gap-4 ">
          <div className=" p-2 hidden lg:flex lg:flex-col w-[35%]">
            <div className="my-2">
              <h2 className="text-[18px] font-bold text-gray-400">
                CATEGORIES DES PRODUITS
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li
                  className="flex text-center cursor-pointer items-center justify-between py-2"
                  onClick={() => handleCategoryClick("men")}
                >
                  <p>Homme</p>
                  <p className="text-[11px] pt-2">(999)</p>
                </li>
                <li
                  className="flex text-center cursor-pointer items-center justify-between py-2"
                  onClick={() => handleCategoryClick("women")}
                >
                  <p>Femme</p>
                  <p className="text-[11px] pt-2">(999)</p>
                </li>
                <li
                  className="flex text-center cursor-pointer items-center justify-between py-2"
                  onClick={() => handleCategoryClick("children")}
                >
                  <p>Enfant</p>
                  <p className="text-[11px] pt-2">(999)</p>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-[18px] font-bold text-gray-400">
                HUSKY FILTRE
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center items-center  py-2">
                  <input type="checkbox" id="option1" name="option1" />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 1
                  </label>
                </li>
                <li className="flex text-center items-center   py-2">
                  <input type="checkbox" id="option2" name="option2" />
                  <label
                    htmlFor="option2"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 2
                  </label>
                </li>
                <li className="flex text-center items-center   py-2">
                  <input type="checkbox" id="option3" name="option3" />
                  <label
                    htmlFor="option3"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 3
                  </label>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-[18px] font-bold text-gray-400">
                CHOiSIS SITEWEB
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option1"
                    name="option1"
                    className="rounded-full"
                  />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 1
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option2"
                    name="option2"
                    className="rounded-full"
                  />
                  <label
                    htmlFor="option2"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 2
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option3"
                    name="option3"
                    className="rounded-full"
                  />
                  <label
                    htmlFor="option3"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 3
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div className="m-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data &&
              data.map((prd) => (
                <div key={prd.product_id} className="">
                  <a href={prd.link}>
                    <div
                      className=""
                      onMouseEnter={() => handleMouseEnter(prd.product_id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img src={prd.img} alt="" />
                    </div>
                  </a>
                  <div className="flex flex-col items-start px-2">
                    <h1 className="text-gray-400 text-[14px]">
                      {prd.sectionName}
                    </h1>
                    <h1 className="text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis w-[200px]">
                      {prd.name}
                    </h1>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="text-[14px]">{prd.price} DA</h1>
                      <button onClick={() => toggleFavorite(prd.product_id)}>
                        <MdOutlineFavorite
                          color={prd.isFavorite ? "red" : "gray"}
                          size={24}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
