import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscActivateBreakpoints, VscTrash, VscEdit } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";

function WishList() {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newPriceThreshold, setNewPriceThreshold] = useState("");
  const [showIcons, setShowIcons] = useState(null); // Nouvel état pour afficher les icônes

  useEffect(() => {
    const userId = Cookies.get("id");
    const userToken = Cookies.get("authToken");
    if (userId) {
      axios
        .get(`http://localhost:3001/favoris/produit`, {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setNewPriceThreshold(product.priceThreshold || "");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setNewPriceThreshold("");
  };

  const handleSaveClick = () => {
    if (newPriceThreshold > 0) {
      console.log(
        `New price threshold for product ${currentProduct.product_id}: ${newPriceThreshold}`
      );
      // Here you can add the code to save the new price threshold to the server
      setIsEditing(false);
      setCurrentProduct(null);
      setNewPriceThreshold("");
    } else {
      alert("Please enter a valid price greater than 0");
    }
  };

  const handleDeleteClick = (favoriteId) => {
    const userToken = Cookies.get("authToken");
    console.log(favoriteId)
    axios
      .delete(`http://localhost:3001/favoris/${favoriteId}`, {
        headers: { Authorization: "Bearer " + userToken },
      })
      .then((response) => {
        console.log(`Product with ID: ${favoriteId} deleted successfully`);
        setData(data.filter((prd) => prd.favorite_id !== favoriteId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const Modal = ({
    newPriceThreshold,
    setNewPriceThreshold,
    handleSaveClick,
    handleCancel,
  }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
          <h2 className="text-xl font-bold mb-4">Editer le seuil de prix</h2>
          <input
            type="number"
            value={newPriceThreshold}
            onChange={(e) => setNewPriceThreshold(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full"
            placeholder="Nouveau prix"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white rounded-md p-2 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              className="bg-red-500 text-white rounded-md p-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-[500] text-gray-600 m-6">
        Ma Listes d'envies
      </h1>
      <div className="m-6 ">
        <ul className="flex flex-col w-full text-gray-500">
          <li className="justify-around border-b-2 border-gray-400 flex py-2 font-[500]">
            <h1>IMAGE DU PRODUIT</h1>
            <h1>NOM DU PRODUIT</h1>
            <h1>PRIX UNITAIRE</h1>
            <h1>SEUIL DE PRIX</h1>
            <h1 className="hidden lg:flex">ETAT DE STOCK</h1>
          </li>

          {data &&
            data.map((prd) => (
              <div
                key={prd.favorite_id}
                className="items-center flex border-b-2 border-gray-200"
              >
                <div className="flex items-center justify-center">
                  {showIcons === prd.favorite_id ? (
                    <>
                      <VscTrash
                        onClick={() => handleDeleteClick(prd.favorite_id)}
                        className="cursor-pointer text-red-500"
                      />
                      <VscEdit
                        onClick={() => handleEditClick(prd)}
                        className="cursor-pointer text-blue-500 ml-2"
                      />
                    </>
                  ) : (
                    <VscActivateBreakpoints
                      onClick={() => setShowIcons(prd.favorite_id)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
                <li className="justify-around items-center flex py-2 font-[500] w-full">
                  <img className="h-20 w-20" src={prd.product.img} alt="" />
                  <h1 className="w-[20%]">{prd.product.name}</h1>
                  <h1>{prd.product.price}</h1>
                  <h1>{prd.pricef}</h1>
                  <h1 className="hidden lg:flex justify-center w-[13%]">
                    {prd.product.availability}
                  </h1>
                </li>
              </div>
            ))}
        </ul>
        {isEditing && (
          <Modal
            newPriceThreshold={newPriceThreshold}
            setNewPriceThreshold={setNewPriceThreshold}
            handleSaveClick={handleSaveClick}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default WishList;
