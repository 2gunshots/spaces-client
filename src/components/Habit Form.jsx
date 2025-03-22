import React, { useState } from "react";
import "./portal.css";
import checkSvg from "../icons/check.svg";
import closeSvg from "../icons/close.svg";
import axios from "axios";
import { motion } from "framer-motion";
import { createHabit } from "../api";
import { themeColors } from "../colors";
import { useAuth } from "../context/authState";

function CreateHabitForm(props) {
    const { authToken } = useAuth();
    let random = Math.random();
    random = random * 3;
    random = Math.floor(random);

    const [habit, setHabit] = useState({
        name: "",
        goal: "",
        metrics: "times",
        repeat: "Daily",
        days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        type: "Build",
        showBadge: "Yes",
        note: "",
        check: "",
        color: random,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target; //destructuring
        setHabit((prevValues) => {
            if (name === "days") {
                const updatedDays = checked
                    ? [...prevValues.days, value]
                    : prevValues.days.filter((day) => day !== value);
                return { ...prevValues, days: updatedDays };
            } else if (name === "color") {
                return { ...prevValues, color: parseInt(value) };
            } else if (type === "checkbox") {
                return { ...prevValues, [name]: checked ? value : "" };
            } else {
                return { ...prevValues, [name]: value };
            }
        });
        console.log([name], value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // try {
        //     const response = await axios.post(
        //         "http://localhost:4000/api/v1/habits/create",
        //         { habit, userId: props.user.id }
        //     );
        //     console.log(response.data);
        //     props.setPop(false);
        //     props.onFormSubmit();
        // } catch (err) {
        //     console.error("Error submitting habit:", err);
        // }
        await createHabit(habit, props.user.id, authToken);
        props.setPop(false);
        props.onFormSubmit();
    };

    return (
        <motion.div
            className="pop"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
        >
            <form onSubmit={handleSubmit}>
                <div className="popHeader">
                    <button type="submit" className="submitButton">
                        <img
                            src={checkSvg}
                            alt="submit button"
                            height="26px"
                            width="26px"
                        />
                    </button>
                    <button type="button" className="closeButton">
                        <img
                            onClick={() => {
                                props.setPop(false);
                            }}
                            src={closeSvg}
                            alt="close button"
                            height="24px"
                            width="24px"
                        />
                    </button>
                </div>

                <div className="habitGrid">
                    <div>
                        <div>
                            <label htmlFor="habitName">Name</label>
                            <br />
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={habit.name}
                                autoComplete="off"
                            />
                            <br />
                        </div>
                        <div>
                            <label>Habit Goal</label>
                            <br />
                            <input
                                type="text"
                                name="goal"
                                onChange={handleChange}
                                value={habit.goal}
                                autoComplete="off"
                            />
                            <br />
                            <input
                                type="text"
                                name="metrics"
                                onChange={handleChange}
                                value={habit.metrics}
                                placeholder="times"
                            />
                            <br />
                        </div>
                        <div>
                            <label>Repeat</label>
                            <br />
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="repeat"
                                    checked={habit.repeat !== "Daily"}
                                    // value="Daily"
                                    onChange={() =>
                                        setHabit((prev) => ({
                                            ...prev,
                                            repeat:
                                                prev.repeat === "Daily"
                                                    ? "Weekly"
                                                    : "Daily",
                                        }))
                                    }
                                />
                                <div className="slider onOff">
                                    <span className="on">Daily</span>
                                    <span className="off">Weekly</span>
                                </div>
                            </label>
                            <br />
                        </div>
                        <label>On these days</label>
                        <br />
                        <div className="days-container non-selectable">
                            {[
                                "mon",
                                "tue",
                                "wed",
                                "thu",
                                "fri",
                                "sat",
                                "sun",
                            ].map((day) => (
                                <label key={day} className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="days"
                                        value={day}
                                        checked={habit.days.includes(day)}
                                        onChange={handleChange}
                                    />
                                    <span>{day.charAt(0).toUpperCase()}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Habit Type</label>
                            <br />
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="type"
                                    value="Build"
                                    checked={habit.type !== "Build"}
                                    onChange={() =>
                                        setHabit((prev) => ({
                                            ...prev,
                                            type:
                                                prev.type === "Build"
                                                    ? "Quit"
                                                    : "Build",
                                        }))
                                    }
                                />
                                <div className="slider onOff">
                                    <span className="on">Build</span>
                                    <span className="off">Quit</span>
                                </div>
                            </label>
                            <br />
                        </div>
                        <div>
                            <label>Show Badge if No Activity Today</label>
                            <br />
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="showBadge"
                                    value="Yes"
                                    checked={habit.showBadge !== "Yes"}
                                    onChange={() =>
                                        setHabit((prev) => ({
                                            ...prev,
                                            showBadge:
                                                prev.showBadge === "Yes"
                                                    ? "No"
                                                    : "Yes",
                                        }))
                                    }
                                />
                                <div class="slider onOff">
                                    <span className="on">Yes</span>
                                    <span className="off">No</span>
                                </div>
                            </label>
                            <br />
                        </div>
                        <div>
                            <label>Color</label>
                            <br />
                            <div className="colors-container non-selectable">
                                {themeColors[props.theme].map(
                                    (color, index) => (
                                        <label key={color} className="checkbox">
                                            <input
                                                type="radio"
                                                name="color"
                                                value={index}
                                                checked={habit.color === index}
                                                onChange={handleChange}
                                            />
                                            <span
                                                style={{
                                                    background: `${color}`,
                                                }}
                                            ></span>
                                        </label>
                                    )
                                )}
                            </div>
                            <br />
                        </div>

                        <div className="habitNote">
                            <label for="note">Add a Note</label>
                            <br />
                            <textarea
                                name="note"
                                placeholder="You can write about habit. Why do you want to build/quit it."
                                onChange={handleChange}
                                value={habit.note}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}

export default CreateHabitForm;
