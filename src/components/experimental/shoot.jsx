import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Shoot() {
    const [initPosition, setInitPosition] = useState({
        xEnd: window.innerWidth + 5,
        yStart: -5,
    });

    const getRandomPosition = () => {
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;
        const xStart = Math.random() * maxX;
        const yEnd = Math.random() * maxY;

        const dx = initPosition.xEnd - xStart;
        const dy = yEnd - initPosition.yStart;

        const angleRadians = Math.atan2(dy, dx);
        const angleDegrees = angleRadians * (180 / Math.PI);

        return {
            xStart,
            yEnd,
            angle: angleDegrees,
        };
    };
    const [position, setPosition] = useState(() => getRandomPosition());

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(getRandomPosition());
        }, 5000); // Move every second (adjust as needed)

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="shoot"
                style={{
                    height: "2px",
                    width: "50px",
                    backgroundColor: "whitesmoke",
                    position: "fixed",
                    // rotate: { angleDegrees },
                    zIndex: 999,
                }}
                initial={{
                    x: position.xStart,
                    y: initPosition.yStart,
                    rotate: position.angle,
                }}
                animate={{
                    x: initPosition.xEnd,
                    y: position.yEnd,
                    rotate: position.angle,
                }}
                transition={{
                    duration: 2,
                    type: "spring",
                }}
            ></motion.div>
        </AnimatePresence>
    );
}

export default Shoot;
