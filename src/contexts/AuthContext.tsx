import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoading(false);

            if (user) {
                console.log(user);
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
