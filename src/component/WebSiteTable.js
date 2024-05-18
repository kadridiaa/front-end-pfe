import React ,{useState} from 'react'
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';


function WebSiteTable() {
    

    
    const [isEditing, setIsEditing] = useState(false);

    const handleIconClick = () => {
        setIsEditing(!isEditing);
      };

    const handleEditClick = () => {
        console.log('Editing sale:');
      };
    
    const handleDeleteClick = () => {
        console.log('Deleting sale:');
      };

  return (
    <div className='rounded-xl m-4  bg-white lg:w-[70%] shadow-2xl'>
     
      <div className='w-full flex justify-between'>
      <h2 className="text-xl font-serif p-4">Sites Table</h2>
      <button className='rounded-xl bg-red-600 text-white text-[12px] hover:bg-red-400 m-2 px-2'>
        Ajouter Site
      </button>
      </div>
      <div className='w-full flex flex-col items-center'>
         <div className='grid gap-2 grid-cols-4 text-center py-4 place-content-center  w-full font-serif'>
            <h1>Nom de site</h1>
            <h1>Nombre de scrapping</h1>
            <h1>Date</h1>
            <h1>Edit</h1>
         </div>   
    
      {/* {ventesData.map((sale) => (
        <div key={sale.produit} className='grid gap-2 grid-cols-5 md:grid-cols-7 text-center place-content-center items-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
         <h1>{sale.produit}</h1>
         <h1>{sale.client}</h1>
         <h1>{sale.dateVente.toLocaleTimeString()}</h1>
         <h1>{sale.quantite}</h1>
         <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
            <VscTrash onClick={handleDeleteClick} className='cursor-pointer text-red-500' />
            <VscEdit onClick={handleEditClick} className='cursor-pointer text-blue-500 ml-2' />
          </>
        ) : (
          <VscActivateBreakpoints className='cursor-pointer' />
        )}
      </div>
        </div>
      ))} */}
      
      </div>
     
    </div>

  )
}

export default WebSiteTable
