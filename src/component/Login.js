import React, { useState } from "react";

function Login({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false, // Initial state for the "Remember Me" checkbox
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === "rememberMe" ? checked : value; // Handle checkbox differently
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traiter les données ici, par exemple, envoyer une requête au serveur
    console.log(formData);
    // Réinitialiser les données du formulaire après la soumission
    setFormData({
      username: "",
      email: "",
      password: "",
      rememberMe: formData.rememberMe, // Preserve the state of "Remember Me" checkbox
    });
    // Fermer la modal
    onClose();
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
          <form onSubmit={handleSubmit}>
           
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm font-semibold">
                Se souvenir de moi
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:duration-700 text-white py-2 px-4  hover:bg-red-600"
            >
              S'inscrire
            </button>
          </form>
        </div>
        <div className="md:w-1/2 p-4 md:pl-8">
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-800"
            onClick={onClose} // Close modal when exit button is clicked
          >
            Fermer
          </button>
          <h2 className="text-2xl text-gray-600  mb-4">S'enregistrer</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-semibold">
                Identifiant
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border  border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm font-semibold">
                J'ai lu et approuvé
                <a href="/Condition" className="text-blue-600 pl-2">
                  les conditions d'utilisation
                </a>
                <p className="flex w-[90%] text-[12px] text-gray-400 font-[400]">
                Vos données personnelles seront utilisées pour vous accompagner au cours de votre visite du site web, gérer l’accès à votre compte, et pour d’autres raisons décrites dans notre politique de confidentialité.
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
