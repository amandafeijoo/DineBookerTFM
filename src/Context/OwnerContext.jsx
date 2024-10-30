import React, { createContext, useState } from "react";

export const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [ownerAvatar, setOwnerAvatar] = useState(null);

  return (
    <OwnerContext.Provider
      value={{
        currentOwner,
        setCurrentOwner,
        ownerAvatar,
        setOwnerAvatar,
        isOwner,
        setIsOwner,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};
