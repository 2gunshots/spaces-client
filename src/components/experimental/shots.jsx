import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Shoot() {
    const [initPosition, setInitPosition] = useState({
        xEnd: window.innerWidth + 5,
        yStart: -5,
    });

    const getRandom = () => {
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;
        const xStart = (Math.random() * maxX) / 3;
        const yEnd = (Math.random() * maxY) / 2 + maxY / 2;

        const shotHeight = Math.floor(Math.random() * 2 + 1);
        const shotWidth = Math.floor(Math.random() * 30 + 50);

        const dx = initPosition.xEnd - xStart;
        const dy = yEnd - initPosition.yStart;

        const angleRadians = Math.atan2(dy, dx);
        const angleDegrees = angleRadians * (180 / Math.PI);

        return {
            xStart,
            yEnd,
            angle: angleDegrees,
            shotHeight,
            shotWidth,
        };
    };
    const ms = (Math.floor(Math.random() * (5 + 1)) + 5) * 1000;

    const [position, setPosition] = useState(() => getRandom());
    const [isMounted, setIsMounted] = useState(true); // State to toggle mounting

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(getRandom());
            setIsMounted((prev) => !prev); // Toggle mount every 5 seconds
        }, ms); // Toggle every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <AnimatePresence>
            {isMounted && ( // Only render the component if isMounted is true
                <motion.div
                    className="shoot"
                    style={{
                        // height: "1px",
                        // width: "70px",
                        backgroundColor: "whitesmoke",
                        position: "fixed",
                        zIndex: 1,
                    }}
                    initial={{
                        height: position.shotHeight,
                        width: position.shotWidth,
                        x: position.xStart,
                        y: initPosition.yStart,
                        rotate: position.angle,
                    }}
                    animate={{
                        height: position.shotHeight,
                        width: position.shotWidth,
                        x: initPosition.xEnd,
                        y: position.yEnd,
                        rotate: position.angle,
                    }}
                    transition={{
                        delay: 3,
                        duration: 1.8,
                        type: "spring",
                    }}
                ></motion.div>
            )}
        </AnimatePresence>
    );
}

export default Shoot;
