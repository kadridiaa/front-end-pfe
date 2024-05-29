import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  },  );

  const fetchContacts = async () => {
    const userToken =  await Cookies.get("authToken")

    try {
      const response = await axios.get("http://localhost:3001/contactes", {headers: {Authorization : "berear " + userToken}}) ;
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleContactClick = async (contactId) => {
    const userToken =  await Cookies.get("authToken")
    try {
      const response = await axios.get(
        `http://localhost:3001/contactes/${contactId}` , {headers: {Authorization : "berear " + userToken}}
      );
      const contact = response.data;
      setSelectedContact(contact);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col rounded-xl m-3 shadow-2xl  bg-white justify-center ">
          <h1 className="text-[18px] p-6 font-serif">Contacts Clients :</h1>
          {contacts.map((contact) => (
            <div
              key={contact.contacte_id}
              className="flex w-[90%] items-center font-serif text-[12px] bg-gray-400/30  m-2  py-3 rounded-xl"
              onClick={() => handleContactClick(contact.contacte_id)}
            >
              <p className="justify-between px-6 flex w-full">Nouveau contact</p>
            </div>
          ))}
        </div>
      </div>
      {selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Détails du contact :</h2>
            <p>Commentaire : {selectedContact.commentaire}</p>
            <p>Date : {new Date(selectedContact.DateC).toLocaleDateString()}</p>
            <button onClick={handleCloseModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactTable;
