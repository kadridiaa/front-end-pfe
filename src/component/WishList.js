import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from 'react-icons/io5';
import Cookies from "js-cookie";

function WishList() {
  const [data, setData] = useState();

  useEffect(() => {
    const userId = Cookies.get("id");
    if (userId) {
      axios.get(`http://localhost:3001/favoris`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);



 

  const handleDelete = (productId) => {
    // Implement your delete logic here
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-[500] text-gray-600 m-6">
        Ma Listes d'envies
      </h1>
      <div className="m-6 ">
        <ul className="flex flex-col w-full text-gray-500">
          <li className="justify-around border-b-2 border-gray-400 flex py-2 font-[500]">
            <h1>IMAGE DU PODUIT</h1>
            <h1>NOM DU PODUIT</h1>
            <h1>PRIX UNITAIRE</h1>
            <h1>ETAT DE STOCK</h1>
          </li>
          {data &&
            data.map((prd) => (
              <div key={prd.product.product_id} className="items-center flex border-b-2 border-gray-200">
                  {/* Delete icon */}
                  <button className="p-2 border-2 border-gray-400 rounded-[50%] " onClick={() => handleDelete(prd.product_id)}>
                    <IoClose />
                  </button>
                <li className="justify-around  items-center  flex py-2 font-[500] w-full">
                  <img className="h-20 w-20" src={prd.product.img} alt="" />
                  <h1 className="w-[20%]">{prd.product.name}</h1>
                  <h1>{prd.product.price}</h1>
                  <h1 className="flex justify-center w-[13%]">
                    {prd.product.availability}
                  </h1>
                </li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default WishList;
