import React, { useState, useEffect } from "react";
import Habits from "./Habits";
import CreateHabitForm from "./Habit Form";
import Journal from "./Journal";
import { AnimatePresence, motion } from "framer-motion";
import { openAnimation } from "../animations";
import { useAuth } from "../context/authState";

function Body() {
    const { user, theme } = useAuth();
    const [pop, setPop] = useState(false);
    const [formSubmit, setFormSubmit] = useState(false);
    const onFormSubmit = () => {
        setFormSubmit((prev) => !prev);
    };

    // const [idToOpen, setIdToOpen] = useState(null);

    return (
        <div className="main-body">
            <Journal user={user} />
            <Habits
                formSubmit={formSubmit}
                // setIdToOpen={setIdToOpen}
                setPop={setPop}
                user={user}
                theme={theme}
            />
            <AnimatePresence>
                {pop && (
                    <CreateHabitForm
                        setPop={setPop}
                        onFormSubmit={onFormSubmit}
                        user={user}
                        theme={theme}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                    {...openAnimation}
                    className="overlay"
                    style={{ display: `${pop ? "block" : "none"}` }}
                ></motion.div>
            </AnimatePresence>

            {/* {idToOpen !== null ? <HabitPortal id={idToOpen} /> : null} */}
        </div>
    );
}

export default Body;
