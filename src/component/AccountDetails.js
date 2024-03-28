import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AccountDetails() {
  // Define state variables
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Define handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    // Use formData to send data to the backend via API
    console.log(formData);
  };

  // Define handleChange function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userId = Cookies.get("id");
    if (userId) {
      axios.get(`http://localhost:3001/users/${userId}`)
        .then((response) => {
          const userData = response.data;
          // Update form state with user data retrieved
          setFormData({
            username: userData.username,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
          });
        })
        .catch((error) => {
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
              htmlFor="firstName"
              className="block text-sm font-semibold mb-2"
            >
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold mb-2"
            >
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-2"
          >
            Nom affiché
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
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
            htmlFor="currentPassword"
            className="block text-sm font-semibold mb-2"
          >
            Mot de passe actuel (laisser vide pour le conserver)
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold mb-2"
          >
            Nouveau mot de passe (laisser vide pour conserver l’actuel)
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold mb-2"
          >
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
            required
          />
        </div>
        <button onClick={()=> console.log(formData)}
          type="submit"
          className="outline-none w-full bg-red-500 hover:duration-700 text-white py-2 px-4 hover:bg-red-600"
        >
          S'enregistrer
        </button>
      </form>
    </div>
  );
}

export default AccountDetails;
