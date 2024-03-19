import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiAbacus, BiX } from "react-icons/bi";
import { MdOutlineFavorite } from "react-icons/md";

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState(null);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const toggleFavorite = (productId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.product_id === productId
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-y-scroll">
      <div
        className={
          isFilterOpen
            ? "bg-gray-600 bg-opacity-50 fixed top-0 left-0 h-screen w-full z-10 transition-opacity duration-500"
            : ""
        }
        onClick={toggleFilter}
      ></div>
      <div className="flex items-center justify-center m-4 text-[20px] text-gray-400">
        <a href="">HOME</a>
        <a className="px-2" href="">
          /
        </a>
        <a href="">SHOP</a>
      </div>
      <div className="flex items-center justify-center">
        <BiAbacus size={22} color="gray" />
        <button
          className="px-2 text-[20px] font-medium text-gray-400"
          onClick={toggleFilter}
        >
          FILTER
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
              CATEGORIES OF PRODUCTS
            </h2>
            <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
            <ul className="mt-2 text-gray-500">
              <li className="flex text-center  items-center justify-between py-2">
                <p>Homme</p>
                <p className="text-[11px] pt-2">(999)</p>
              </li>
              <li className="flex text-center items-center justify-between py-2">
                <p>Homme</p>
                <p className="text-[11px] pt-2">(999)</p>
              </li>
              <li className="flex text-center items-center justify-between py-2">
                <p>Homme</p>
                <p className="text-[11px] pt-2">(999)</p>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-[18px] font-bold text-gray-400">
              HUSKY FILTER
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
              CHOOSE WEBSITE
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
      <div className="relative flex items-center justify-center m-4 ">
        <select className="appearance-none bg-gray-200 border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          <option>Ordered by price</option>
          <option>Ordered by date</option>
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
      <div>
        <div className="m-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data &&
            data.map((prd) => (
              <div key={prd.product_id}>
                <div>
                  <a href={prd.link}>
                    <img src={prd.img} alt="" />
                  </a>
                  <div className="flex flex-col items-start px-2">
                    <h1 className="text-gray-400 text-[14px]">
                      {prd.sectionName}
                    </h1>
                    <h1 className="text-[14px]">{prd.name}</h1>
                    <div className="flex items-center ">
                      {/* Conditionally render favorite icon based on isFavorite status */}
                      <h1 className="text-[14px]">{prd.price} DA</h1>
                      <button
                        className="pl-12"
                        onClick={() => toggleFavorite(prd.product_id)}
                      >
                        <MdOutlineFavorite
                          color={prd.isFavorite ? "red" : "gray"}
                          size={24}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
