import React, { useState } from "react";
import axios from "axios";
import backSvg from "../icons/back.svg";
import checkSvg from "../icons/check.svg";
import closeSvg from "../icons/close.svg";
import delSvg from "../icons/del.svg";
import { deleteHabit, editHabit } from "../api";
import { motion } from "framer-motion";
import { openAnimation } from "../animations";
import { themeColors } from "../colors";
import { useAuth } from "../context/authState";

function EditHabitForm(props) {
    const { authToken } = useAuth();
    const [habitToEdit, setHabitToEdit] = useState({
        id: props.habit.habit_id,
        name: props.habit.habit_name,
        goal: props.habit.goal,
        metrics: props.habit.metrics,
        repeat: props.habit.repeat,
        days: props.habit.days,
        type: props.habit.type,
        showBadge: props.habit.show_badge,
        color: props.habit.color,
        note: props.habit.note,
        repeatChange: false,
    });

    const handleDelete = async (event) => {
        // event.preventDefault();
        //     try {
        //         const response = await axios.delete(
        //             `http://localhost:4000/api/v1/habits?habitId=${habitToEdit.id}`
        //         );
        //         console.log(response.data);
        //         props.onEntryLog();
        //         props.setIdToOpen(null);
        //         props.setEditForm((prev) => !prev);
        //     } catch (err) {
        //         console.error("Error submitting habit:", err);
        //     }
        await deleteHabit(habitToEdit.id, props.onEntryLog, authToken);
        props.setIdToOpen(null);
        props.setEditForm((prev) => !prev);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target; //destructuring
        setHabitToEdit((prevValues) => {
            if (name === "color") {
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
        //     const response = await axios.put(
        //         "http://localhost:4000/api/v1/habits/update",
        //         { habit: habitToEdit }
        //     );
        //     console.log(response.data);
        //     // props.onEntryLog();
        //     // props.setEditForm((prev) => !prev);
        // } catch (err) {
        //     console.error("Error updating habit:", err);
        // }
        await editHabit(habitToEdit, authToken);
    };
    return (
        <motion.div {...openAnimation} className="pop">
            <form
            // onSubmit={handleSubmit}
            >
                <div className="popHeader">
                    <button type="button" style={{ marginRight: "20px" }}>
                        <img
                            src={backSvg}
                            alt="Go Back button"
                            onClick={() => {
                                props.setEditForm((prev) => !prev);
                            }}
                        />
                    </button>
                    <button
                        type="submit"
                        className="submitButton"
                        onClick={handleSubmit}
                    >
                        <img
                            src={checkSvg}
                            alt="submit button"
                            height="26px"
                            width="26px"
                            onClick={() => {
                                props.onEntryLog();
                                props.setEditForm((prev) => !prev);
                            }}
                        />
                    </button>

                    <button
                        type="button"
                        style={{ marginLeft: "auto" }}
                        onClick={handleDelete}
                    >
                        <img
                            src={delSvg}
                            alt="Delete button"
                            height="26px"
                            width="26px"
                        />
                    </button>

                    <button
                        type="button"
                        className="closeButton"
                        style={{ marginLeft: "10px" }}
                    >
                        <img
                            onClick={() => {
                                props.setIdToOpen(null);
                                props.setEditForm((prev) => !prev);
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
                                value={habitToEdit.name}
                            />
                        </div>
                        <div>
                            <label>Habit Goal</label>
                            <br />
                            <input
                                type="text"
                                name="goal"
                                onChange={handleChange}
                                value={habitToEdit.goal}
                            />
                            <br />
                            <input
                                type="text"
                                name="metrics"
                                onChange={handleChange}
                                value={habitToEdit.metrics}
                                placeholder="times"
                            />
                            <br />
                        </div>
                        <div>
                            <label>Repeat</label>
                            <br />
                            <label className="switch non-selectable">
                                <input
                                    type="checkbox"
                                    name="repeat"
                                    checked={habitToEdit.repeat !== "Daily"}
                                    // onChange={() =>
                                    //     setHabitToEdit((prev) => ({
                                    //         ...prev,
                                    //         repeat:
                                    //             prev.repeat === "Daily"
                                    //                 ? "Weekly"
                                    //                 : "Daily",
                                    //         repeatChange: !prev.repeatChange,
                                    //     }))
                                    // }
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
                                        className="non-selectable"
                                        type="checkbox"
                                        name="days"
                                        value={day}
                                        checked={habitToEdit.days.includes(day)}
                                        onChange={handleChange}
                                    />
                                    <span>{day.charAt(0).toUpperCase()}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Show Badge if No Activity Today</label>
                            <br />
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="showBadge"
                                    value="Yes"
                                    checked={habitToEdit.showBadge !== "Yes"}
                                    onChange={() =>
                                        setHabitToEdit((prev) => ({
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
                            <label>Habit Type</label>
                            <br />
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="type"
                                    value="Build"
                                    checked={habitToEdit.type !== "Build"}
                                    onChange={() =>
                                        setHabitToEdit((prev) => ({
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
                                                checked={
                                                    habitToEdit.color === index
                                                }
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
                                value={habitToEdit.note}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}

export default EditHabitForm;
