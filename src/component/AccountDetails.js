import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AccountDetails() {
  // Define state variables
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Define handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const userToken = Cookies.get("authToken");
      const response = await axios.put(
        "http://localhost:3001/users/",
        {
          username: formData.username,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: "Bearer " + userToken },
        }
      );
      console.log("User updated:", response.data);

      // Delete authentication token upon successful password change
      Cookies.remove("authToken");

      // Reset form data after successful submission
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordMatchError(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error states or display error messages
    }
  };

  useEffect(() => {
    const userId = Cookies.get("id");
    if (userId) {
      axios
        .get(`http://localhost:3001/users/${userId}`)
        .then((response) => {
          const userData = response.data;

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
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold mb-2"
          >
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword" // Make sure id matches htmlFor
            name="confirmPassword" // Make sure name matches formData property
            value={formData.confirmPassword} // Make sure value matches formData property
            onChange={handleChange}
            className={`outline-none w-full px-3 py-2 border border-gray-300 shadow ${
              passwordMatchError ? "border-red-500" : ""
            }`}
            required
          />
          {passwordMatchError && (
            <p className="text-red-500 text-sm mt-1">
              Les mots de passe ne correspondent pas.
            </p>
          )}
        </div>
        <button
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
