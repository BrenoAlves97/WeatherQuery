import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [searchs, setSearchs] = useState([]);
  const [signed, setSigned] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, signed, setSigned, searchs, setSearchs }}>
      {children}
    </UserContext.Provider>
  );
};
