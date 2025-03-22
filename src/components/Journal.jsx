import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchJournal } from "../api";
import { submitJournalEntry } from "../api";
import { useAuth } from "../context/authState";

function Journal(props) {
    // const [isTyping, setIsTyping] = useState(false);
    const [entry, setEntry] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [err, setError] = useState(null);
    const [date, setDate] = useState(new Date());
    const { user, authToken } = useAuth();
    useEffect(() => {
        // Update the date when the component mounts
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000); // Update every second

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const getJournal = async () => {
            try {
                const data = await fetchJournal(user.id, authToken);
                console.log(user.id);
                setEntry(data.content);
            } catch (err) {
                setError("Failed to load journal.");
            }
        };

        getJournal();
    }, []);

    useEffect(() => {
        if (isTyping === true) {
            const debounceTimeout = setTimeout(() => {
                // if (entry) {
                // axios
                //     .post("http://localhost:4000/api/v1/journal/entry", {
                //         journalEntry: entry,
                //         userId: props.user.id,
                //     })
                //     .then((res) => {
                //         console.log("response saved", res);
                //     })
                //     .catch((err) => {
                //         console.log("Error saving journal", err);
                //     });
                submitJournalEntry(entry, user.id, authToken);
                setIsTyping(false);
                // }
            }, 2000);

            return () => {
                clearTimeout(debounceTimeout);
            };
        }
    }, [entry, isTyping]);

    const handleChange = (event) => {
        setEntry(event.target.value);
        setIsTyping(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const formatDate = (date) => {
        const dayOfWeek = date.toLocaleString("en-GB", { weekday: "short" });
        const day = date.getDate().toString().padStart(2, "0"); // Pads single digits
        const month = date.toLocaleString("en-GB", { month: "short" });
        const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

        return `${dayOfWeek}, ${day} ${month} ${year}`;
    };

    return (
        <div className="journal">
            <form onSubmit={handleSubmit}>
                <h3>
                    Journal
                    <div
                        style={{
                            opacity: "50%",
                            display: "inline",
                            marginLeft: "10px",
                            fontSize: "14px",
                        }}
                    >
                        {formatDate(date)}`{/* Sat, 1 Feb 25' */}
                    </div>
                </h3>

                <textarea
                    placeholder={"Start writing your journal..."}
                    value={entry}
                    onChange={handleChange}
                    spellCheck="false"
                />
            </form>
        </div>
    );
}

export default Journal;
