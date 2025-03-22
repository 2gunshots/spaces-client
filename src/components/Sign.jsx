import React, { useRef, useState, useEffect } from "react";
import asfs from "../images/asfs.png";
import SignupPage from "./SignUp";
import LoginPage from "./login";
import { motion, AnimatePresence } from "framer-motion";
import { openAnimation } from "../animations";

function Sign(props) {
    const [whichForm, setWhichForm] = useState(props.form);
    console.log(props.form);
    return (
        <motion.div className="outerbox" {...openAnimation}>
            <img
                src={asfs}
                alt="A sky full of stars"
                height="560px"
                width="auto"
            />
            {whichForm ? (
                <SignupPage setWhichForm={setWhichForm} />
            ) : (
                <LoginPage
                    setWhichForm={setWhichForm}
                    handleLogin={props.handleLogin}
                    setIsLogged={props.setIsLogged}
                />
            )}
        </motion.div>
    );
}

export default Sign;
