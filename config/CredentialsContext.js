import { createContext } from "react";

const CredentialsContext = createContext({userToken: null, setUserToken: () => {}});