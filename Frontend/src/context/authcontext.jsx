import { createContext, useContext, useEffect, useState } from 'react';

const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        // Add your effect logic here (e.g., check for existing session)
    }, []);

    const login = async (email, password) => {
        // Add login logic here
    };

    const signup = async (name, email, password) => {
        // Add signup logic here
    };

    const logout = async () => {
        // Add logout logic here
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
