import React, { createContext, useState } from 'react';

export const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // Nuevo estado para isOwner
  const [ownerAvatar, setOwnerAvatar] = useState(null);  // Nuevo estado para el avatar del propietario

  return (
    <OwnerContext.Provider value={{ currentOwner, setCurrentOwner, ownerAvatar, setOwnerAvatar,isOwner,setIsOwner }}>
      {children}
    </OwnerContext.Provider>
  );
};
