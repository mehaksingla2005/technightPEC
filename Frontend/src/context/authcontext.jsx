import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create an authentication context
const authContext = createContext(null);

// Authentication provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Effect to check if the user is already logged in (e.g., check localStorage or session)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieving user from localStorage
        if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true); // Set the logged-in state to true
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/login', { email, password }); // Login request
            const loggedInUser = response.data;

            // Save user details in localStorage or session storage
            localStorage.setItem('user', JSON.stringify(loggedInUser)); // Store the user in localStorage

            setUser(loggedInUser); // Update the state with the logged-in user
            setIsLoggedIn(true); // Update the logged-in status
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Throw error for handling in the frontend
        }
    };

    // Signup function
    const signup = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/register', { name, email, password }); // Signup request
            const registeredUser = response.data;

            // Save registered user data in localStorage
            localStorage.setItem('user', JSON.stringify(registeredUser)); // Store the registered user

            setUser(registeredUser); // Update state with registered user
            setIsLoggedIn(true); // Update the logged-in status
        } catch (error) {
            console.error('Signup error:', error);
            throw error; // Throw error for handling in the frontend
        }
    };

    // Logout function
    const logout = async () => {
        try {
            // Add any additional server-side logout logic here (if required)

            // Remove user from localStorage
            localStorage.removeItem('user'); // Clear user from localStorage

            setUser(null); // Clear user state
            setIsLoggedIn(false); // Set the logged-in state to false
        } catch (error) {
            console.error('Logout error:', error);
            throw error; // Throw error for handling in the frontend
        }
    };

    // The value object provided through the AuthProvider
    const value = {
        user,         // Current logged-in user
        isLoggedIn,   // Boolean to check if user is logged in
        login,        // Login function
        logout,       // Logout function
        signup,       // Signup function
    };

    // Return the provider with the value containing all state and functions
    return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

// Custom hook to use the auth context easily in any component
export const useAuth = () => useContext(authContext);
