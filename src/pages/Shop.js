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
    <div className="mt-4">
      <button
        onClick={handleSearchClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Scrappe some products
      </button>

      {showPopover && (
        <div className="border border-gray-300 p-4 mt-4">
          <label className="block mb-2">
            Choose Website:
            <select
              value={selectedWebsite}
              onChange={handleWebsiteChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Website</option>
              <option value="zara">Zara</option>
              <option value="pmg">Pmg</option>
            </select>
          </label>

          {selectedWebsite === "pmg" && (
            <label className="block mb-2">
              Choose Brand:
              <select
                value={selectedBrand}
                onChange={handleBrandChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Brand</option>
                <option value="lacoste">Lacoste</option>
                <option value="new-balance">New Balance</option>
              </select>
            </label>
          )}

          {selectedWebsite === "zara" && (
            <label className="block mb-2">
              Number of Products:
              <input
                type="number"
                value={numOfProducts}
                onChange={handleNumOfProductsChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          )}

          <label className="block mb-2">
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={handleProductNameChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block mb-2">
            Choose Sexe:
            <select
              value={selectedSexe}
              onChange={handleSexeChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Sexe</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="kid">Kid</option>
            </select>
          </label>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Shop;

//   const handleSubmit = () => {
//     const formData = {
//         numberOfProducts: numOfProducts,
//         nameOfProduct: productName,
//         sexe: selectedSexe,
//         selectedWebsite: selectedWebsite
//     };

//     fetch('http://127.0.0.1:5000/store_data', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Data stored successfully');
//         } else {
//             console.error('Failed to store data');
//         }
//     })
//     .catch(error => console.error('Error:', error));
//     setShowPopover(false);
// };
