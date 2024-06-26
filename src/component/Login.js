import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function Login({ onClose }) {
  const [formData1, setFormData1] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const initialFormData = {
    firstName: "",
    lastName: "",
    username: "",
    email1: "",
    password1: "",
    rememberMe: false,
  };

  const [formData2, setFormData2] = useState(initialFormData);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log(formData1);
    setFormData1({
      email: "",
      password: "",
    });
    onClose();
  };
  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData2((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users", {
        firstName: formData2.firstName,
        lastName: formData2.lastName,
        username: formData2.username,
        email: formData2.email1,
        password: formData2.password1,
        isAdmin: false,
      });
      console.log("User created successfully:", response.data);
      setFormData2(initialFormData);
      // Handle successful registration (e.g., redirect to another page or display a success message)
    } catch (error) {
      console.error("Error creating user:", error.response.data);
      // Handle error (e.g., display error message)
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email: formData1.email,
        password: formData1.password,
      });
      console.log(response.data)

      // Accéder à l'ID utilisateur depuis la réponse de l'API
      const userId = response.data.user.id;
      console.log(userId);

      // Stocker l'ID utilisateur dans les cookies
      Cookies.set("id", userId, { expires: 7, path: "" });
      Cookies.set("authToken", response.data.token, { expires: 7, path: "" });

      // Rediriger l'utilisateur vers la page de profil
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white pb-2 mt-4 md:h-[87vh] w-[80%] lg:w-[60%] flex flex-col md:flex-row fadeIn  md:p-8">
        <div className="md:w-1/2 pt-2  border-r-[1px] pr-6 border-gray-300 px-4">
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-800"
            onClick={onClose}
          >
            Fermer
          </button>
          <h2 className="text-2xl text-gray-600  mb-4">Se connecter</h2>
          <form onSubmit={handleSubmit1}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData1.email}
                onChange={handleChange1}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData1.password}
                onChange={handleChange1}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:duration-700 text-white py-2 px-4  hover:bg-red-600"
              onClick={login}
            >
              S'inscrire
            </button>
          </form>
        </div>
        <div className="md:w-1/2 p-4 md:pl-8">
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-800"
            onClick={onClose}
          >
            Fermer
          </button>
          <h2 className="text-2xl text-gray-600  mb-4">S'enregistrer</h2>
          <form onSubmit={handleSubmit2}>
            <div className="mb-4">
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
                    value={formData2.firstName}
                    onChange={handleChange2}
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
                    value={formData2.lastName}
                    onChange={handleChange2}
                    className="outline-none w-full px-3 py-2 border border-gray-300 shadow"
                    required
                  />
                </div>
              </div>
              <label htmlFor="username" className="block text-sm font-semibold">
                Identifiant
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData2.username}
                onChange={handleChange2}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email1" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email1"
                name="email1"
                value={formData2.email1}
                onChange={handleChange2}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password1"
                className="block text-sm font-semibold"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password1"
                name="password1"
                value={formData2.password1}
                onChange={handleChange2}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData2.rememberMe}
                onChange={handleChange2}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm font-semibold">
                J'ai lu et approuvé
                <a href="/Condition" className="text-blue-600 pl-2">
                  les conditions d'utilisation
                </a>
                <p className="flex w-[90%] text-[12px] text-gray-400 font-[400]">
                  Vos données personnelles seront utilisées pour vous
                  accompagner au cours de votre visite du site web, gérer
                  l’accès à votre compte, et pour d’autres raisons décrites dans
                  notre politique de confidentialité.
                </p>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:duration-700 text-white py-2 px-4  hover:bg-red-600"
            >
              S'enregistrer
            </button>
          </form>
        </div>
      </div>{" "}
    </div>
  );
}

export default Login;
