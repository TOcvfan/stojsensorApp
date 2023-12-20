"use client"
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [locations, setLocations] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const value = {
        locations,
        setLocations,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext)