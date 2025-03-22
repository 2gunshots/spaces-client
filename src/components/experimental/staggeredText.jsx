import React from "react";
import { motion } from "framer-motion";

const staggeredFadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }, // 0.2 seconds delay between each letter
};

const letterVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.1 } }, // Duration for each letter
};

const spaceVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 0, transition: { duration: 0 } }, // Keep space as invisible (no opacity change)
};

const StaggeredText = ({ text }) => {
    return (
        // <motion.div
        <div
            variants={staggeredFadeIn}
            initial="hidden"
            animate="show"
            exit="hidden"
            style={{ display: "inline-block" }}
        >
            {text.split("").map((letter, index) => (
                <motion.div
                    style={{ display: "inline" }}
                    key={index}
                    variants={letter === " " ? spaceVariants : letterVariants} // Handle space separately
                    // style={{ display: "inline-block" }}
                >
                    {letter}
                </motion.div>
            ))}
        </div>
        // </motion.div>
    );
};

export default StaggeredText;
