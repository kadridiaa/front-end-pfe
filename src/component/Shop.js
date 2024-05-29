import React, { useState } from "react";

function Shop() {
  const [showPopover, setShowPopover] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedSexe, setSelectedSexe] = useState("");
  const [numOfProducts, setNumOfProducts] = useState(0);

  const handleSearchClick = () => {
    setShowPopover(true);
  };

  const handleSexeChange = (event) => {
    const selectedValue = event.target.value;

    let convertedValue = selectedValue;
    if (selectedWebsite === "pmg") {
      if (selectedValue === "man") {
        convertedValue = "homme";
      } else if (selectedValue === "woman") {
        convertedValue = "femme";
      } else if (selectedValue === "kid") {
        convertedValue = "enfant";
      }
    }

    setSelectedSexe(convertedValue);
    console.log(convertedValue);
  };

  const handleWebsiteChange = (event) => {
    setSelectedWebsite(event.target.value);
    setSelectedBrand("");
    // setNumOfProducts(0);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleNumOfProductsChange = (event) => {
    setNumOfProducts(parseInt(event.target.value));
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleSubmit = () => {
    let formData = {};

    if (selectedWebsite === "zara") {
      formData = {
        numberOfProducts: numOfProducts,
        nameOfProduct: productName,
        sexe: selectedSexe,
        selectedWebsite: selectedWebsite,
      };
    } else if (selectedWebsite === "pmg") {
      formData = {
        product_searched: productName,
        sexe: selectedSexe,
        brand: selectedBrand,
        selectedWebsite: selectedWebsite,
      };
    }

    const url =
      selectedWebsite === "zara"
        ? "http://127.0.0.1:5000/store_data_zara"
        : "http://127.0.0.1:5000/store_data_pmg";
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data stored successfully");
        } else {
          console.error("Failed to store data");
        }
      })
      .catch((error) => console.error("Error:", error));
    setShowPopover(false);
    console.log(formData);
  };

  return (
    <div className="">
      {/* <button
        onClick={handleSearchClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Scrappe some products
      </button> */}

      
        <div className=" p-4 mt-4">
          <label className="block mb-2">
          <h1 className="block text-gray-700 text-sm font-bold mb-2">
            Choose Website:
            </h1>
            <select
              value={selectedWebsite}
              onChange={handleWebsiteChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Website</option>
              <option value="zara">Zara</option>
              <option value="pmg">Pmg</option>
            </select>
          </label>

          {selectedWebsite === "pmg" && (
            <label className="block mb-2">
              <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Choose Brand:
              </h1>
              <select
                value={selectedBrand}
                onChange={handleBrandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Brand</option>
                <option value="lacoste">Lacoste</option>
                <option value="new-balance">New Balance</option>
              </select>
            </label>
          )}

          {selectedWebsite === "zara" && (
            <label className="block text-gray-700 text-sm font-bold mb-2">
             <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Number of Products:
              </h1>
              <input
                type="number"
                value={numOfProducts}
                onChange={handleNumOfProductsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          )}

          <label className="block mb-2 ">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
            Product Name:
            </h1>
            <input
              type="text"
              value={productName}
              onChange={handleProductNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <label className="block mb-2">
          <h1 className="block text-gray-700 text-sm font-bold mb-2">
            Choose Sexe:
            </h1>
            <select
              value={selectedSexe}
              onChange={handleSexeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Sexe</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="kid">Kid</option>
            </select>
          </label>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Submit
          </button>
        </div>
     
    </div>
  );
}

export default Shop;

