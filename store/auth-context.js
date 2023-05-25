import { Children, createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => {
        // todo 
    },
    logout: () => {}  // reset it   
});

export default function AuthContextProvider({ children }) {
    const [ authToken, setAuthToken ] = useState();

    function authenticate(token) {
        setAuthToken(token); 
    }

    function logout() { 
        setAuthToken(null); 
    }

    const value = { 
        token: authToken,
        isAuthenticated: !!authToken, 
        authenticate: authenticate,
        logout: logout
    };

    // from React Context
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}