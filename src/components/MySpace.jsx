import React, { useEffect } from "react";
import Banner from "./Banner";
import Header from "./Header";
import Body from "./Body";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { openAnimation } from "../animations";
import { useAuth } from "../context/authState";
import { useNavigate } from "react-router-dom";
import DeviceCheck from "./deviceCheck";

function MySpace(props) {
    const navigate = useNavigate();
    const { token, handleLogout } = useAuth();
    // const token = localStorage.getItem("authToken");

    useEffect(() => {
        console.log("token to be check in MySpace: ", token);
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // current time in seconds

            // token is expired?
            if (decodedToken.exp < currentTime) {
                // token is expired.
                console.log("logged out navigation to /home");
                handleLogout();
            }
        } else {
            console.log("Idk why?");
            // navigate("/home");
        }
    }, [navigate]);

    return (
        <motion.div {...openAnimation}>
            <Banner />
            <Header setIsLogged={props.setIsLogged} />
            <Body />
        </motion.div>
    );
}

export default MySpace;
