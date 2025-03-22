import React, { useEffect, useState } from "react";
import Habit from "./Habit Box";
import HabitPortal from "./Habit Portal";
import { fetchHabits } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { openAnimation } from "../animations";
import { themeColors } from "../colors";
import { useAuth } from "../context/authState";

const Habits = (props) => {
    const { user, authToken, theme } = useAuth();
    const [dailyHabits, setDailyHabits] = useState([]);
    const [weeklyHabits, setWeeklyHabits] = useState([]);
    const [err, setError] = useState(null);
    const [entryLog, setEntryLog] = useState(false);

    const [idToOpen, setIdToOpen] = useState(null);

    useEffect(() => {
        const getHabits = async () => {
            try {
                const habits = await fetchHabits(user.id, authToken);
                setDailyHabits(habits.dailyResult);
                setWeeklyHabits(habits.weeklyResult);
            } catch (err) {
                setError("Failed to load habits.");
            }
        };

        getHabits();
        // console.log(habits);
    }, [props.formSubmit, entryLog]);
    if (err) {
        return <div>{err}</div>;
    }
    const onEntrySubmit = () => {
        setEntryLog((prev) => !prev);
    };

    return (
        <div className="habit-container">
            {dailyHabits.length === 0 && weeklyHabits.length === 0 ? (
                <div>
                    <div
                        className="habit-header non-selectable"
                        style={{ width: "200px" }}
                    >
                        <h3 className="headText">Habits</h3>
                        <h2
                            onClick={() => {
                                props.setPop(true);
                            }}
                            className="headerPlus"
                        >
                            +
                        </h2>
                    </div>
                    <div
                        style={{
                            fontSize: "14px",
                            opacity: "40%",
                            fontWeight: "300",
                        }}
                    >
                        Your habits will appear here.
                        <br /> Click on "plus" to create one
                    </div>
                </div>
            ) : null}
            {dailyHabits.length > 0 ? (
                <div>
                    <div className="habit-header non-selectable">
                        <h3 className="headText">Today</h3>
                        <h2
                            onClick={() => {
                                props.setPop(true);
                            }}
                            className="headerPlus"
                        >
                            +
                        </h2>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        {dailyHabits.map((habit) => {
                            return (
                                <Habit
                                    key={habit.habit_id}
                                    id={habit.habit_id}
                                    habit={habit}
                                    name={habit.habit_name}
                                    goal={habit.goal}
                                    entry={habit.entry}
                                    lastLog={habit.lastLog}
                                    streak={habit.streak}
                                    entries={habit.entries}
                                    repeat={habit.repeat}
                                    onEntryLog={onEntrySubmit}
                                    setIdToOpen={setIdToOpen}
                                    color={themeColors[theme][habit.color]}
                                    user={user}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}

            {weeklyHabits.length > 0 ? (
                <div>
                    <div className="habit-header non-selectable">
                        <h3 className="headText">This Week</h3>
                        {dailyHabits.length === 0 ? (
                            <h2
                                onClick={() => {
                                    props.setPop(true);
                                }}
                                className="headerPlus"
                            >
                                +
                            </h2>
                        ) : null}
                    </div>
                    <div>
                        {weeklyHabits.map((habit) => {
                            return (
                                <Habit
                                    key={habit.habit_id}
                                    id={habit.habit_id}
                                    habit={habit}
                                    name={habit.habit_name}
                                    goal={habit.goal}
                                    entry={habit.entry}
                                    lastLog={habit.lastLog}
                                    streak={habit.streak}
                                    entries={habit.entries}
                                    onEntryLog={onEntrySubmit}
                                    setIdToOpen={setIdToOpen}
                                    color={themeColors[theme][habit.color]}
                                    user={user}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}
            <AnimatePresence>
                {idToOpen !== null ? (
                    <HabitPortal
                        id={idToOpen}
                        onEntryLog={onEntrySubmit}
                        entryLog={entryLog}
                        setIdToOpen={setIdToOpen}
                        user={user.id}
                        theme={theme}
                    />
                ) : null}
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                    {...openAnimation}
                    className="overlay"
                    style={{ display: `${idToOpen ? "block" : "none"}` }}
                ></motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Habits;
