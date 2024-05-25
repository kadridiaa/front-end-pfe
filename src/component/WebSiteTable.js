import React, { useState } from 'react';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';

function WebSiteTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [scrappingCount, setScrappingCount] = useState('');
  const [date, setDate] = useState('');

  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditClick = () => {
    console.log('Editing sale:');
  };

  const handleDeleteClick = () => {
    console.log('Deleting sale:');
  };

  const handleAddSiteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Site Name:', siteName);
    console.log('Scrapping Count:', scrappingCount);
    console.log('Date:', date);
    setIsModalOpen(false);
    // Reset form fields
    setSiteName('');
    setScrappingCount('');
    setDate('');
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
        
        <div className="grid gap-2 grid-cols-4 text-center place-content-center items-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center">
          <h1>Zara</h1>
          <h1>13</h1>
          <h1>1/5/2024</h1>
          <div onClick={handleIconClick} className="flex items-center justify-center">
            {isEditing ? (
              <>
                <VscTrash onClick={handleDeleteClick} className="cursor-pointer text-red-500" />
                <VscEdit onClick={handleEditClick} className="cursor-pointer text-blue-500 ml-2" />
              </>
            ) : (
              <VscActivateBreakpoints className="cursor-pointer" />
            )}
          </div>
        </div>
        
        <div className="grid gap-2 grid-cols-4 text-center place-content-center items-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center">
          <h1>PMG</h1>
          <h1>29</h1>
          <h1>2/5/2024</h1>
          <div onClick={handleIconClick} className="flex items-center justify-center">
            {isEditing ? (
              <>
                <VscTrash onClick={handleDeleteClick} className="cursor-pointer text-red-500" />
                <VscEdit onClick={handleEditClick} className="cursor-pointer text-blue-500 ml-2" />
              </>
            ) : (
              <VscActivateBreakpoints className="cursor-pointer" />
            )}
          </div>
        </div>
        
        <div className="grid gap-2 grid-cols-4 text-center place-content-center items-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center">
          <h1>Breshka</h1>
          <h1>10</h1>
          <h1>4/5/2024</h1>
          <div onClick={handleIconClick} className="flex items-center justify-center">
            {isEditing ? (
              <>
                <VscTrash onClick={handleDeleteClick} className="cursor-pointer text-red-500" />
                <VscEdit onClick={handleEditClick} className="cursor-pointer text-blue-500 ml-2" />
              </>
            ) : (
              <VscActivateBreakpoints className="cursor-pointer" />
            )}
          </div>
        </div>
        
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Ajouter un site</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="siteName">
                  Nom de site
                </label>
                <input 
                  type="text" 
                  id="siteName" 
                  value={siteName} 
                  onChange={(e) => setSiteName(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scrappingCount">
                  Nombre de scrapping
                </label>
                <input 
                  type="number" 
                  id="scrappingCount" 
                  value={scrappingCount} 
                  onChange={(e) => setScrappingCount(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input 
                  type="date" 
                  id="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required 
                />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Ajouter
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
