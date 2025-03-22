import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { submitHabitEntry } from "../api";
import { useAuth } from "../context/authState";

function Habit(props) {
    const { authToken, handleLogout } = useAuth();
    const width = (props.entries / props.goal) * 220;
    console.log(width);
    const handleSubmit = async (event) => {
        event.preventDefault();
        // try {
        //     const response = await axios.post(
        //         "http://localhost:4000/api/v1/habits/log/",
        //         {
        //             habitId: props.id,
        //             habitRepeat: props.repeat ? props.repeat : "Weekly",
        //         }
        //     );
        //     console.log(response.data);
        //     props.onEntryLog();
        // } catch (err) {
        //     console.error("Error submitting habit:", err);
        // }
        try {
            await submitHabitEntry(
                props.id,
                props.repeat,
                props.onEntryLog,
                authToken
            );
        } catch (err) {
            console.error("Error submitting habit:", err);
            if (err.status === 401) {
                // localStorage.removeItem("user");
                // localStorage.removeItem("authToken");
                handleLogout();
            }
            throw err;
        }
    };

    return (
        <form onSubmit={handleSubmit} action="">
            <div className="habit-box non-selectable">
                <motion.div
                    // {...habitCardAnimation}
                    animate={{ width: width }}
                    transition={{ duration: 0.5, type: "spring" }}
                    //
                    className="habit-overlay"
                    style={{
                        width: `${width}px`,
                        background: `${props.color}`,
                        ...(width >= 220 && {
                            borderBottomRightRadius: "20px",
                            borderTopRightRadius: "20px",
                        }),
                    }}
                ></motion.div>
                <div
                    className="title"
                    onClick={() => {
                        props.setIdToOpen(props.id);
                        const print = props.repeat ? props.repeat : "Weekly";
                        console.log(print);
                    }}
                >
                    {props.name}
                </div>
                <div className="streak">{props.streak}</div>
                <div
                    className="plus"
                    type="submit"
                    onClick={() => {
                        console.log(`clicked ${props.id} `);
                    }}
                >
                    <button>+</button>
                </div>

                <div className="goals">
                    {props.entries} / {props.goal}
                </div>
            </div>
        </form>
    );
}

function createLog() {}

export default Habit;
