import React from 'react'

function ContactTable() {
  return (
    <div>
      <div className='w-full'>
             <div className='flex flex-col rounded-xl m-4 shadow-2xl  bg-white '>
               <h1 className='text-xl p-6 font-serif'>Contact Clients :</h1>
                {/* products div */}
                 
                {/* {vegetableProducts.map((prd) => (
                  <div key={prd.id} className='flex w-full items-center font-serif text-xl '>
                    <img className='w-10 h-10 pl-4 pb-2 mb-1' src={vegetable} />
                    <p className='justify-between px-6 flex w-full'>
                      <h1>{prd.name}</h1>
                      <h2>{prd.price}$</h2>
                    </p>
                  </div>
                ))} */}
                
             </div>
             </div>
    </div>
  )
}

export default ContactTable
