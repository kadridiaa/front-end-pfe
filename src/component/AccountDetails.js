import React, { useState , useEffect } from "react";
import axios from 'axios';
import Cookies from "js-cookie";


function AccountDetails() {
  // Define state variables
  const [formData, setFormData] = useState({
    rememberMe: false,
  });

  // Define handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  // Define handleChange function
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };


  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user ID from cookies or global state

   
    const userId = Cookies.get("authToken"); // Assuming you store the user ID in a cookie
    console.log(userId);
    if (userId) {
      // Make a request to fetch user data using the user ID
      axios.get(`http://localhost:3001/users/${userId}`)
      .then(response => {
        // Set user data in state
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  return (
    <div className="w-full m-2 mt-4">
      <form onSubmit={handleSubmit} className="m-2">
        <div className="mb-4 flex w-full">
          <div className="w-1/2 mr-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-2"
            >
              Prenom
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="outline-none  w-full px-3 py-2 border  border-gray-300 shadow"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-2"
            >
              Nom
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="outline-none w-full px-3 py-2 border  border-gray-300 shadow"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Nom affiché
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="outline-none w-full px-3 py-2 border  border-gray-300 shadow"
            required
          />
        </div>
        <div className="my-2 italic text-gray-500">
          <p>
            Indique comment votre nom apparaîtra dans la section relative au
            compte et dans les avis
          </p>
        </div>
        <div className="mb-4 mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="outline-none w-full px-3 py-2 border  border-gray-300 shadow"
            required
          />
        </div>
        <div
          className="my-2 py-4 
           font-[500] text-gray-500 border-b-[1px] border-gray-300"
        >
          <p>CHANGEMENT DE MOT DE PASSE</p>
        </div>
        <div className="mb-4 mt-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Mot de passe actuel (laisser vide pour le conserver)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border  border-gray-300 shadow"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Nouveau mot de passe (laisser vide pour conserver l’actuel)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border  border-gray-300 shadow"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border  border-gray-300 shadow"
            required
          />
        </div>
        <button
          type="submit"
          className="outline-none w-full bg-red-500 hover:duration-700 text-white py-2 px-4  hover:bg-red-600"
        >
          S'enregistrer
        </button>
      </form>
    </div>
  );
}

export default AccountDetails;
