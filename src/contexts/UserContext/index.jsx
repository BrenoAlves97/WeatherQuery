import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, signed, setSigned }}>
      {children}
    </UserContext.Provider>
  );
};
