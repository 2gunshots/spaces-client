import React, { useEffect, useState } from "react";
import { fetchHabit } from "../api";
import editSvg from "../icons/edit.svg";
import closeSvg from "../icons/close.svg";
import axios from "axios";
import EditHabitForm from "./Edit Habit Form";
import { AnimatePresence, motion } from "framer-motion";
import { openAnimation } from "../animations";
import { themeColors } from "../colors";
import { submitHabitEntry, removeHabitEntry } from "../api";
import { useAuth } from "../context/authState";

function HabitPortal(props) {
    const { authToken } = useAuth();
    const [habit, setHabit] = useState({});
    const circleWidth = Math.min((habit.entries / habit.goal) * 100, 100);

    const [openEditForm, setEditForm] = useState(false);

    useEffect(() => {
        const getHabit = async () => {
            try {
                const result = await fetchHabit(props.id, authToken);
                console.log("result: ", result);
                setHabit(result[0]);
            } catch (err) {
                console.log(`Failed to load habit ${props.id}`);
            }
        };

        getHabit();
    }, [props.entryLog]);

    const handleClickPlus = async (event) => {
        event.preventDefault();
        // try {
        //     const response = await axios.post(
        //         "http://localhost:4000/api/v1/habits/log/",
        //         {
        //             habitId: habit.habit_id,
        //             habitRepeat: habit.repeat,
        //         }
        //     );
        //     console.log(response.data);
        //     props.onEntryLog();
        // } catch (err) {
        //     console.error("Error submitting habit:", err);
        // }
        await submitHabitEntry(
            habit.habit_id,
            habit.repeat,
            props.onEntryLog,
            authToken
        );
    };
    const handleClickMinus = async (event) => {
        event.preventDefault();
        // try {
        //     const response = await axios.delete(
        //         "http://localhost:4000/api/v1/habits/dellog/",
        //         {
        //             data: { habit: habit },
        //         }
        //     );
        //     console.log(response.data);
        //     props.onEntryLog();
        // } catch (err) {
        //     console.error("Error submitting habit:", err);
        // }
        await removeHabitEntry(habit, props.onEntryLog, authToken);
    };
    return (
        <div>
            <motion.div {...openAnimation} className="pop">
                <div className="popHeader">
                    <button
                        onClick={() => {
                            setEditForm((prev) => !prev);
                        }}
                    >
                        <img
                            src={editSvg}
                            alt="edit habit button"
                            height="26px"
                            width="26px"
                        />
                    </button>
                    <button
                        className="closeButton"
                        onClick={() => {
                            props.setIdToOpen(null);
                        }}
                    >
                        <img src={closeSvg} alt="close habit button" />
                    </button>
                </div>
                <div className="habitName">
                    <h6>{habit.habit_name}</h6>
                </div>
                <p>
                    {habit.goal} {habit.metrics} {habit.repeat}
                </p>

                <div className="circleContainer">
                    {habit.entries > 0 ? (
                        <button onClick={handleClickMinus}>-</button>
                    ) : (
                        <button>-</button>
                    )}

                    <div class="hollow-circle">
                        {habit.entries}
                        <motion.div
                            animate={{
                                clipPath: `polygon(0% 0%, ${circleWidth}% 0%, ${circleWidth}% 100%, 0% 100%)`,
                            }}
                            transition={{ duration: 1 }}
                            class="hollow-circle-overlay"
                            style={{
                                clipPath: `polygon(0% 0%, ${circleWidth}% 0%, ${circleWidth}% 100%, 0% 100%)`,
                                borderColor: `${
                                    themeColors[props.theme][habit.color]
                                }`,
                            }}
                        ></motion.div>
                    </div>

                    <button onClick={handleClickPlus}>+</button>
                </div>
                <div className="statsContainer">
                    <div className="statsBox">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div className="curlyBraces">&#123;</div>
                            <div className="statsText">
                                {habit.streak}{" "}
                                {habit.repeat === "Weekly"
                                    ? habit.streak === 1
                                        ? "Week"
                                        : "Weeks"
                                    : habit.streak === 1
                                    ? "Day"
                                    : "Days"}
                            </div>
                            <div className="curlyBraces">&#125;</div>
                        </div>

                        <p>Current Streak</p>
                    </div>
                </div>

                <div className="statsContainer2">
                    <div className="statsBox">
                        <div className="statsText">
                            {habit.total_entries}{" "}
                            {habit.total_entries === 1 ? "Entry" : "Entries"}
                        </div>
                        <p>Total Count</p>
                    </div>
                    <div className="statsBox">
                        <div className="statsText">
                            {habit.max_streak}{" "}
                            {habit.repeat === "Weekly"
                                ? habit.max_streak === 1
                                    ? "Week"
                                    : "Weeks"
                                : habit.max_streak === 1
                                ? "Day"
                                : "Days"}
                        </div>
                        <p>Best Streak</p>
                    </div>
                </div>
                {habit.note && (
                    <p
                        style={{
                            textAlign: "center",
                            margin: "30px 0px",
                            padding: "0px 50px",
                        }}
                    >
                        {habit.note}
                    </p>
                )}
            </motion.div>
            <AnimatePresence>
                {openEditForm ? (
                    <EditHabitForm
                        habit={habit}
                        setEditForm={setEditForm}
                        setIdToOpen={props.setIdToOpen}
                        onEntryLog={props.onEntryLog}
                        theme={props.theme}
                    />
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default HabitPortal;
