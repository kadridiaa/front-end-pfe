import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiAbacus, BiX } from "react-icons/bi";
import { MdOutlineFavorite } from "react-icons/md";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Shop from "../component/Shop";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWebsites, setSelectedWebsites] = useState([]);
  const [selectedSexes, setSelectedSexes] = useState([]);
  const productsPerPage = 20;
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricef, setPrice] = useState("");

  // Fonction pour ouvrir la popup de la boutique

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
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    let sortedProducts = [...filteredProducts];

    // Tri des produits en fonction de l'option sélectionnée
    switch (selectedSortOption) {
      case "prix":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "plus-recent":
        sortedProducts.sort(
          (a, b) => new Date(b.dateInsr) - new Date(a.dateInsr)
        );
        break;
      default:
        break;
    }

    // Mettre à jour les produits triés
    setData(sortedProducts);
  };
  const savePriceAndAddToWishlist = async () => {
    const userToken = Cookies.get("authToken");
    try {
      if (!pricef.trim()) {
        console.error("Price cannot be empty");
        return;
      }

      console.log("Price to be sent to backend:", pricef);
      await axios.post(
        "http://localhost:3001/favoris/",
        {
          productId: selectedProduct,
          pricef,
        },
        {
          headers: { Authorization: "Bearer " + userToken },
        }
      );
      // Close the modal after successful addition to wishlist
      setIsModalOpen(false);
      // Refetch the wishlist to update UI
      fetchWishlist();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const fetchProducts = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:3001${category ? "/trier/" + category : "/products"}`
      );
      setData(response.data);
      setCurrentPage(1);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Reset des produits triés à leur état initial
    fetchProducts(category);
  }, [category, selectedWebsites, selectedSexes]);

  // Utilisation de useEffect pour re-trier les produits lorsque l'option de tri est modifiée
  useEffect(() => {
    handleSortChange({ target: { value: "prix" } }); // Tri par défaut par prix
  }, [selectedSexes, selectedWebsites]);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setIsLoggedIn(!!authToken);
  });

  const fetchWishlist = async () => {
    const userToken = Cookies.get("authToken");
    try {
      const response = await axios.get(
        "http://localhost:3001/favoris/produit",
        {
          headers: { Authorization: "Bearer " + userToken },
        }
      );
      setWishlist(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setIsLoggedIn(!!authToken);

    if (isLoggedIn) {
      // Fetch wishlist only if user is logged in
      fetchWishlist();
    } else {
      // Reset wishlist if user is not logged in
      setWishlist([]);
    }
  }, [isLoggedIn]);

  const toggleFavorite = async (productId) => {
    const userToken = Cookies.get("authToken");
    try {
      // Check if the user is logged in
      if (!isLoggedIn) {
        console.log("Please log in to add to favorites");
        return;
      }

      // Check if the product is already in the wishlist
      const isProductInWishlist = wishlist.some(
        (item) => item.productId === productId
      );

      if (isProductInWishlist) {
        const favoriteItem = wishlist.find(
          (item) => item.productId === productId
        );
        if (favoriteItem) {
          await axios.delete(
            `http://localhost:3001/favoris/${favoriteItem.favorite_id}`,
            {
              headers: { Authorization: "Bearer " + userToken },
            }
          );
          // Remove the product from the wishlist
          setWishlist((prev) =>
            prev.filter((item) => item.productId !== productId)
          );
        }
      } else {
        // If the product is not in the wishlist, add it
        setSelectedProduct(productId); // Set the selected product for setting the price
        setIsModalOpen(true); // Open the popout modal
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  // Handle checkbox changes for websites
  const handleCheckboxChange = (websiteId) => {
    setSelectedWebsites((prevSelected) =>
      prevSelected.includes(websiteId)
        ? prevSelected.filter((id) => id !== websiteId)
        : [...prevSelected, websiteId]
    );
  };

  const handleSexeChange = (sexe) => {
    let sectionName = "";
    // Déterminez la valeur correspondante de la sectionName en fonction de l'option sélectionnée
    switch (sexe) {
      case "homme":
        sectionName = "man";
        break;
      case "femme":
        sectionName = "woman";
        break;
      case "enfant":
        sectionName = "kid";
        break;
      default:
        break;
    }
    // Mettre à jour le state en conséquence
    setSelectedSexes((prevSelected) =>
      prevSelected.includes(sectionName)
        ? prevSelected.filter((s) => s !== sectionName)
        : [...prevSelected, sectionName]
    );
  };

  // Filter products based on selected websites and sexes
  const filteredProducts = data
    ? data.filter(
        (product) =>
          (selectedWebsites.length === 0 ||
            selectedWebsites.includes(product.websiteId)) &&
          (selectedSexes.length === 0 ||
            selectedSexes.includes(product.sectionName.toLowerCase()))
      )
    : [];

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
                  <input
                    type="checkbox"
                    id="homme"
                    name="homme"
                    onChange={() => handleSexeChange("homme")}
                  />
                  <label
                    htmlFor="homme"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Homme
                  </label>
                </li>
                <li className="flex text-center items-center cursor-pointer justify-between py-2">
                  <input
                    type="checkbox"
                    id="femme"
                    name="femme"
                    onChange={() => handleSexeChange("femme")}
                  />
                  <label
                    htmlFor="femme"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Femme
                  </label>
                </li>
                <li className="flex text-center items-center cursor-pointer justify-between py-2">
                  <input
                    type="checkbox"
                    id="enfant"
                    name="enfant"
                    onChange={() => handleSexeChange("enfant")}
                  />
                  <label
                    htmlFor="enfant"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Enfant
                  </label>
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
                  <input
                    type="checkbox"
                    id="option1"
                    name="option1"
                    onChange={() => handleCheckboxChange(1)}
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
                    onChange={() => handleCheckboxChange(2)}
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
                    onChange={() => handleCheckboxChange(3)}
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
            <div className="">
              <h2 className="text-[18px] font-bold text-gray-400">
                HUSKY FILTRE
              </h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
              <ul className="mt-2 text-gray-500">
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option1"
                    name="option1"
                    onChange={() => handleCheckboxChange(1)}
                  />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Disponibilité
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option2"
                    name="option2"
                    onChange={() => handleCheckboxChange(2)}
                  />
                  <label
                    htmlFor="option2"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Promotion
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center m-4">
          <div className="hidden lg:flex pr-4">
            <h1 className="text-gray-500">
              Affichage de 1–20 sur {filteredProducts.length} résultats
            </h1>
          </div>
          <select
            className="appearance-none bg-gray-200 border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={handleSortChange}
          >
            <option disabled selected value="">
              Sélectionner le tri
            </option>
            <option value="prix">Tri par prix</option>
            <option value="plus-recent">Tri du plus récent</option>
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
                  <input
                    type="checkbox"
                    id="homme"
                    name="homme"
                    onChange={() => handleSexeChange("homme")}
                  />
                  <label
                    htmlFor="homme"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Homme
                  </label>
                </li>
                <li className="flex text-center items-center cursor-pointer justify-between py-2">
                  <input
                    type="checkbox"
                    id="femme"
                    name="femme"
                    onChange={() => handleSexeChange("femme")}
                  />
                  <label
                    htmlFor="femme"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Femme
                  </label>
                </li>
                <li className="flex text-center items-center cursor-pointer justify-between py-2">
                  <input
                    type="checkbox"
                    id="enfant"
                    name="enfant"
                    onChange={() => handleSexeChange("enfant")}
                  />
                  <label
                    htmlFor="enfant"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Enfant
                  </label>
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
                  <input
                    type="checkbox"
                    id="option1"
                    name="option1"
                    onChange={() => handleCheckboxChange(1)}
                  />
                  <label
                    htmlFor="option1"
                    className="px-2 text-[15px] text-black font-[600]"
                  >
                    Disponibilité
                  </label>
                </li>
                <li className="flex text-center items-center py-2">
                  <input
                    type="checkbox"
                    id="option2"
                    name="option2"
                    onChange={() => handleCheckboxChange(2)}
                  />
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
                    onChange={() => handleCheckboxChange(1)}
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
                    onChange={() => handleCheckboxChange(2)}
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
                    onChange={() => handleCheckboxChange(3)}
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
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md">
                  <h2 className="text-gray-800 text-lg font-semibold mb-4">
                    Set the price for the product
                  </h2>
                  {/* Input field for setting the price */}
                  <input
                    type="number"
                    placeholder="Enter price..."
                    className="border border-gray-300 px-3 py-2 rounded-md w-full mb-4"
                    value={pricef}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={savePriceAndAddToWishlist} // Call the save function onClick
                  >
                    Save
                  </button>
                  {/* Cancel button */}
                  <button
                    className="text-gray-600 px-4 py-2 rounded-md ml-4 hover:text-gray-800"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
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
                          color={
                            wishlist.some(
                              (item) => item.productId === prd.product_id
                            )
                              ? "red"
                              : "gray"
                          }
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
      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-none">
              {[
                ...Array(
                  Math.ceil(filteredProducts.length / productsPerPage)
                ).keys(),
              ].map((number) => (
                <li key={number} className="mx-1">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`py-2 px-4 ${
                      currentPage === number + 1
                        ? "bg-gray-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } rounded`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Home;
