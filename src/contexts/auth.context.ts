import {createContext} from "react";

export const AuthContext = createContext({
    auth: false,
    setAuth: (flag: boolean) => {},
});