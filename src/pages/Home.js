import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiAbacus, BiX } from "react-icons/bi";
import { MdOutlineFavorite } from "react-icons/md";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("man");
  const [hoveredId, setHoveredId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  let query = useQuery();
  let category = query.get("type");

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const fetchProducts = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:3001${category ? '/trier/'+ category : "/products"}`
      );
      setData(response.data);
      setCurrentPage(1); 
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchProducts(category);
  }, [category]);

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
      const response = await axios.post("http://localhost:3001/favoris", {
        productId: productId,
      });
      console.log(response.data);
      // Update UI to indicate that the product is favorited
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data ? data.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-screen flex flex-col">
      <div
        className={
          isFilterOpen
            ? "bg-gray-600 bg-opacity-50 fixed top-0 left-0 h-screen w-full z-10 transition-opacity duration-500"
            : ""
        }
        onClick={toggleFilter}
      ></div>
      <div className="lg:flex lg:items-center lg:w-full lg:justify-evenly">
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
          <div className="p-4">
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
                <li className="flex text-center cursor-pointer items-center justify-between py-2">
                  <p>Homme</p>
                  
                </li>
                <li className="flex text-center items-center cursor-pointer justify-between py-2">
                  <p>Femme</p>
             
                </li>
                <li className="flex text-center items-center cursor-pointer justify-between py-2">
                  <p>Enfant</p>
                  
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-[18px] font-bold text-gray-400">
                HUSKY FILTRE
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center items-center py-2">
                  <input type="checkbox" id="option1" name="option1" />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 1
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input type="checkbox" id="option2" name="option2" />
                  <label
                    htmlFor="option2"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Option 2
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
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
        <div className="flex items-center justify-center m-4">
          <div className="hidden lg:flex pr-4">
            <h1 className="text-gray-500">
              Affichage de 1–20 sur {data ? data.length : 0} résultats
            </h1>
          </div>
          <select className="appearance-none bg-gray-200 border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          <option disabled selected value="">Sélectionner le tri</option>
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
        <div className="w-full lg:w-[70%] flex gap-4">
          <div className="p-2 hidden lg:flex lg:flex-col w-[35%]">
            <div className="my-2">
              <h2 className="text-[18px] font-bold text-gray-400">
                CATEGORIES DES PRODUITS
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center cursor-pointer items-center justify-between py-2">
                  <p>Homme</p>
                  
                </li>
                <li className="flex text-center cursor-pointer items-center justify-between py-2">
                  <p>Femme</p>
                  
                </li>
                <li className="flex text-center cursor-pointer items-center justify-between py-2">
                  <p>Enfant</p>
                  
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-[18px] font-bold text-gray-400">
                HUSKY FILTRE
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center items-center py-2">
                  <input type="checkbox" id="option1" name="option1" />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Disponibilité
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input type="checkbox" id="option2" name="option2" />
                  <label
                    htmlFor="option2"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Promotion
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
                    ZARA
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
                    PMG
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
                    BRESHKA
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="m-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {currentProducts &&
              currentProducts.map((prd) => (
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
      {data && data.length > productsPerPage && (
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-none">
              {[...Array(Math.ceil(data.length / productsPerPage)).keys()].map(
                (number) => (
                  <li key={number} className="mx-1">
                    <button
                      onClick={() => paginate(number + 1)}
                      className={`py-2 px-4 ${
                        currentPage === number + 1
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                      } rounded`}
                    >
                      {number + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Home;
