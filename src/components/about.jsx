import React, { useState, useEffect } from "react";
import "./about.css";
import Background from "./background";
import spacesSvg from "../icons/spaces.svg";
import aboutText from "../icons/aboutText.svg";
import Shots from "./experimental/shots";
import StaggeredText from "./experimental/staggeredText";
import geminiSvg from "../constellations/gemini xs.svg";
import MindFuckButton from "./experimental/Button";
import { motion, AnimatePresence } from "framer-motion";
import Sign from "./Sign";
import { Link } from "react-router-dom";
import window from "../images/window.jpg";
import prod from "../images/prod.mp4";

function About(props) {
    let text = [
        "A space to write & track your life",
        "A space where you can pretend your life is a movie",
        "A space where your overthinking has a home",
        "A space for your worst ideas and even wilder decisions",
        "A space where you can cry everyday",
        "A space where you can write about your 5 minute goals and 5 hour distractions",
        "A space to record your thoughts, even when you forget what you were thinking",
        "A space where your brain can go on vacation without you.",
    ];
    const [openSign, setOpenSign] = useState(false);
    const [whichForm, setWhichForm] = useState(true); //true is signuo false is login

    //background: rgb(39,33,58);
    //background: linear-gradient(140deg, rgba(39,33,58,1) 16%, rgba(79,67,119,1) 51%, rgba(156,138,212,1) 100%);
    const random = Math.floor(Math.random() * text.length);
    return (
        <motion.div className="noScroll">
            <div className="head">
                <Link to="/">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={spacesSvg}
                            alt=""
                            height="auto"
                            width="130px"
                        />
                    </div>
                </Link>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "60px",
                        alignItems: "center",
                    }}
                >
                    <button
                        className="signInButton"
                        onClick={() => {
                            setOpenSign(true);
                            setWhichForm(false);
                        }}
                    >
                        Sign in
                    </button>
                    {/* <button className="getStartedButton">Get Started</button> */}
                    <AnimatePresence>
                        <button
                            onClick={() => {
                                setOpenSign(true);
                                setWhichForm(true);
                            }}
                        >
                            <MindFuckButton
                                id={0}
                                text="Get Started"
                                width={150}
                                height={50}
                                radius={120}
                            />
                        </button>
                    </AnimatePresence>
                </div>
            </div>

            <div className="aboutBody">
                <div className="mid">
                    <div className="aboutText">
                        <img
                            src={aboutText}
                            alt=""
                            height="auto"
                            width="500px"
                        />
                        {/* <h2 style={{ fontSize: "90px" }}>
                            Write Your
                            <br />
                            True Stories
                        </h2> */}
                        <br />
                        {/* <p>{text}</p> */}
                        <StaggeredText text={text[random]} />
                    </div>
                    <div style={{ marginRight: "40px" }}>
                        <img
                            src={geminiSvg}
                            alt=""
                            height="600px"
                            width="auto"
                        />
                    </div>
                </div>

                {/* <div className="window">
                    <img
                        src={window}
                        alt="app preview image"
                        height="200px"
                        width="auto"
                    />
                </div> */}

                {/* <div className="foot">
                    <h3
                        style={{
                            fontWeight: "400",
                            fontSize: "12px",
                            textAlign: "center",
                        }}
                    >
                        Github
                    </h3>
                    <div
                        style={{
                            fontSize: "12px",
                            fontWeight: "200",
                            paddingTop: "5px",
                        }}
                    >
                        This website was created as a personal project to
                        explore and enhance my web development skills. It serves
                        as a showcase of my skills and a space for experimenting
                        with new technologies, design patterns, and creative
                        ideas.
                    </div>
                </div> */}
            </div>

            {openSign && (
                <div>
                    <div
                        className="overlay"
                        style={{ display: "block" }}
                        onClick={() => {
                            setOpenSign(false);
                        }}
                    ></div>
                    <Sign form={whichForm} setIsLogged={props.setIsLogged} />
                </div>
            )}
            <Shots />
            <Background />
        </motion.div>
    );
}

export default About;
