import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            setLoading(false);
        }
    },[])



    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        setLoading(false);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        setLoading(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const value = {
        user,
        token,
        login,
        logout,
        loading,
      }

    return (<AuthContext.Provider value = {value}>{children}</AuthContext.Provider>)
}