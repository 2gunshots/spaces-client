import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthProvider } from "../context/authState";
import MySpace from "./MySpace";
import About from "./about";
import DeviceCheck from "./deviceCheck";

function App() {
    return (
        <Router>
            <AppWithRoutes />
        </Router>
    );
}

function AppWithRoutes() {
    const token = localStorage.getItem("authToken");
    const [isLogged, setIsLogged] = useState(
        // localStorage.getItem("authToken") != null
        false
    );

    useEffect(() => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in seconds

        // token is expired?
        if (decodedToken.exp < currentTime) {
            // token is expired.
            setIsLogged(false);
        } else {
            setIsLogged(true);
        }
    });

    return (
        <div className="App">
            <AuthProvider>
                <DeviceCheck>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isLogged ? (
                                    <MySpace setIsLogged={setIsLogged} />
                                ) : (
                                    <Navigate to="/home" />
                                )
                            }
                        />
                        <Route
                            path="/home"
                            element={<About setIsLogged={setIsLogged} />}
                        />
                    </Routes>
                </DeviceCheck>
            </AuthProvider>
        </div>
    );
}

export default App;
