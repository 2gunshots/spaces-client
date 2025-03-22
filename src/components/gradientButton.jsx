import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMouse from "@react-hook/mouse-position";

function MindFuckGradientButton(props) {
    const radius = props.radius;
    const [init, setInit] = useState({});
    const [exit, setExit] = useState({});
    const [onButton, setOnButton] = useState(false);

    const ref = React.useRef(null);
    // const mouse = useMouse(ref);
    const mouse = useMouse(ref, {
        enterDelay: 0,
        leaveDelay: 0,
    });

    useEffect(() => {
        const targetButton = document.getElementById("targetButton");

        const handleMouseEnter = (event) => {
            const rect = targetButton.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log("Enter: ", x, y);
            setInit({ x: x, y: y });
        };

        if (targetButton) {
            targetButton.addEventListener("mouseenter", handleMouseEnter);
        }

        // Cleanup: remove event listener when component unmounts
        return () => {
            if (targetButton) {
                targetButton.removeEventListener(
                    "mouseenter",
                    handleMouseEnter
                );
            }
        };
    }, []);

    return (
        <div>
            <button
                id="targetButton"
                ref={ref}
                onMouseEnter={() => {
                    // if (mouse.x != null && mouse.y != null) {
                    setOnButton(true);

                    // }
                }}
                onMouseLeave={() => {
                    setOnButton(false);
                    setExit({ x: mouse.x, y: mouse.y });
                    console.log("Exit: ", mouse.x, mouse.y);
                }}
                style={{
                    // top: "50%",
                    // left: "50%",
                    // transform: "translate(-50%, -50%)",
                    width: `${props.width}px`,
                    height: `${props.height}px`,
                    background: "trasparent",
                    border: `2px solid transparent`,
                    borderImage:
                        "linear-gradient(140deg, rgba(39,33,58,1) 16%, rgba(79,67,119,1) 51%, rgba(156,138,212,1) 100%) border-box ",
                    borderRadius: "500px",
                    // padding: "10px",
                    fontFamily: "Montserrat",

                    fontSize: "16px",
                    fontWeight: "600",
                    position: "relative",
                    color: onButton ? "#151515" : "whitesmoke",
                    transition: "color 0.1s ",
                    // position: "relative", // Make sure button has relative positioning
                    overflow: "hidden",
                }}
            >
                {onButton && (
                    <motion.div
                        style={{
                            position: "absolute",
                            transformOrigin: "center",
                            opacity: 1, //not required once its in button
                            fontSize: "20px",
                            fontWeight: "600px",
                            color: "#151515",
                            aspectRatio: "1",
                            borderRadius: "50%",
                            background:
                                "linear-gradient(140deg,rgba(39, 33, 58, 1) 16%,rgba(79, 67, 119, 1) 51%,rgba(156, 138, 212, 1) 100%)",
                            pointerEvents: "none",
                            zIndex: 1,
                        }}
                        initial={{
                            x: init.x,
                            y: init.y,
                            width: "2px",
                            height: "2px",
                        }}
                        animate={{
                            // Set the circle's center to cursor position
                            x: mouse.x - (onButton ? radius : 0), // Offset by half the circle size (80px)
                            y: mouse.y - (onButton ? radius : 0), // Offset by half the circle size (80px)
                            width: onButton ? `${radius * 2}px` : "0px",
                            height: onButton ? `${radius * 2}px` : "0px",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 1,
                        }}
                        exit={{
                            x: exit.x,
                            y: exit.y,
                            width: "0px",
                            height: "0px",
                        }}
                    ></motion.div>
                )}
                <span
                    style={{
                        position: "relative",
                        zIndex: 2,
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                >
                    {props.text}
                </span>
            </button>
        </div>
    );
}

export default MindFuckGradientButton;
