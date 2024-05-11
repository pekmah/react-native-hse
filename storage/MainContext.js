import { createContext, useState } from "react";

export const MainContext = createContext(null);

export default function MainContextProvider({ children }) {
  const [token, setToken] = useState(null);

  return (
    <MainContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
