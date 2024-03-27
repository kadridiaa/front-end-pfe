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

  const [formData2, setFormData2] = useState({
    username: "",
    email1: "",
    password1: "",
    rememberMe: false,
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  const handleChange2 = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === "rememberMe" ? checked : value;
    setFormData2({
      ...formData2,
      [name]: newValue,
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

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(formData2);
    setFormData2({
      username: "",
      email1: "",
      password1: "",
      rememberMe: formData2.rememberMe,
    });
    onClose();
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        {
          email: formData1.email,
          password: formData1.password,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`, // Use template literals to concatenate the token
          },
        }
      );
      // console.log(response.data)
      console.log(response.data);
      const { userId } = response.data;
      console.log(userId);

      // Handle successful login
      Cookies.set("authToken", response.data.token, { expires: 7, path: "" });
      //  Cookies.set("authToken", token, { expires: 7, path: "" });
      Cookies.set("id", userId, { expires: 7, path: "" });

      // Redirect user to Profile page
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
