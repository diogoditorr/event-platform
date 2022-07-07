import React, { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}