import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated} }>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;