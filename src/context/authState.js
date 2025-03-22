import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

//this is custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
    );
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") != null
            ? parseInt(localStorage.getItem("theme"))
            : 0
    );

    const [authToken, setAuthToken] = useState(
        localStorage.getItem("authToken")
    );

    const handleLogin = (token, user, theme) => {
        setTheme(theme);
        setAuthToken(token);
        setUser(user);
        localStorage.setItem("theme", parseInt(theme));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authToken", token);
    };
    const handleLogout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/home");
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                authToken,
                theme,
                setTheme,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
