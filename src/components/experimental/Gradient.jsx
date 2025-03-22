import React, { useState, useEffect } from "react";
import { easeInOut, motion, spring } from "framer-motion";

function GradientBackground(props) {
    const shapeWidth = props.diameter;
    const shapeHeight = props.diameter;
    const [initPosition, setInitPosition] = useState({
        x: Math.random() * window.innerWidth - shapeWidth / 2,
        y: Math.random() * window.innerHeight - shapeHeight / 2,
    });

    const getRandomPosition = () => {
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;

        return {
            x: Math.random() * maxX,
            y: Math.random() * maxY,
        };
    };
    const [position, setPosition] = useState(() => getRandomPosition());

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(getRandomPosition());
        }, 10000); // Move every second (adjust as needed)

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);
    return (
        <motion.div
            className="balls"
            style={{
                width: shapeWidth, // Shape width
                height: shapeHeight, // Shape height
                // background: `radial-gradient(circle, ${props.color} 0%, transparent 100%)`,
                // background: `radial-gradient(circle at center, rgba(${props.color}, 0.8) 0%, rgba(${props.color}, 0) 50%) no-repeat`,
                // background: "radial-gradient(circle, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 0) 100%)",
                backgroundColor: props.color, // Shape color
                borderRadius: "50%", // For a circle shape
                position: "absolute",
            }}
            initial={{ x: initPosition.x, y: initPosition.y }}
            animate={{ x: position.x, y: position.y }}
            transition={{
                duration: 20,
            }}
        />
    );
}

export default GradientBackground;
