import React, { useState, useEffect } from "react";
import axios from "axios";
import { VscActivateBreakpoints, VscTrash, VscEdit } from "react-icons/vsc";

function WebSiteTable() {
  const [websites, setWebsites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [websitename, setSiteName] = useState("");
  const [editingWebsiteId, setEditingWebsiteId] = useState(null);
  const [NombreS, setScrappingCount] = useState("");
  const [dateS, setDateS] = useState("");
  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get("http://localhost:3001/websites");
      setWebsites(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching websites:", error);
    }
  };
  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditClick = (websiteId) => {
    const website = websites.find((site) => site.website_id === websiteId);
    if (website) {
      setSiteName(website.websitename);
      setEditingWebsiteId(websiteId);
      setDateS(website.dateS);
      setScrappingCount(website.NombreS);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = async (website_id) => {
    try {
      await axios.delete(`http://localhost:3001/websites/${website_id}`);
      fetchWebsites(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting website:", error);
    }
  };
  const handleAddSiteClick = () => {
    setSiteName("");
    setScrappingCount("");
    setEditingWebsiteId(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSite = {
        websitename: websitename,
        NombreS: NombreS,
        DateS: dateS, // Ajout de la date au nouveau site
      };
      if (editingWebsiteId) {
        await axios.put(
          `http://localhost:3001/websites/${editingWebsiteId}`,
          newSite
        );
      } else {
        await axios.post("http://localhost:3001/websites", newSite);
      }
      fetchWebsites(); // Actualiser la liste après l'ajout ou la mise à jour
      setIsModalOpen(false);
      setSiteName("");
      setScrappingCount("");
      setDateS(""); // Réinitialiser la date
      setEditingWebsiteId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="rounded-xl m-4 bg-white lg:w-[70%] shadow-2xl">
      <div className="w-full flex justify-between">
        <h2 className="text-xl font-serif p-4">Sites Table</h2>
        <button
          className="rounded-xl bg-red-600 text-white text-[12px] hover:bg-red-400 m-2 px-2"
          onClick={handleAddSiteClick}
        >
          Ajouter Site
        </button>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="grid gap-2 grid-cols-4 text-center py-4 place-content-center w-full font-serif">
          <h1>Nom de site</h1>
          <h1>Nombre de scrapping</h1>
          <h1>Date</h1>
          <h1>Edit</h1>
        </div>

        {websites.map((website) => (
          <div
            key={website.website_id}
            className="grid gap-2 grid-cols-4 text-center place-content-center items-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center"
          >
            <h1>{website.websitename}</h1>
            <h1>{website.NombreS}</h1>
            <h1>{new Date(website.DateS).toLocaleDateString()}</h1>
            <div
              onClick={handleIconClick}
              className="flex items-center justify-center"
            >
              {isEditing ? (
                <>
                  <VscTrash
                    onClick={() => handleDeleteClick(website.website_id)}
                    className="cursor-pointer text-red-500"
                  />
                  <VscEdit
                    onClick={() => handleEditClick(website.website_id)}
                    className="cursor-pointer text-blue-500 ml-2"
                  />
                </>
              ) : (
                <VscActivateBreakpoints className="cursor-pointer" />
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">
              {editingWebsiteId ? "Modifier le site" : "Ajouter un site"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="siteName"
                >
                  Nom de site
                </label>
                <input
                  type="text"
                  id="websitename"
                  value={websitename}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="NombreS"
                >
                  Nombre de scrapping
                </label>
                <input
                  type="number"
                  id="NombreS"
                  value={NombreS}
                  onChange={(e) => setScrappingCount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingWebsiteId ? "Modifier" : "Ajouter"}
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebSiteTable;
