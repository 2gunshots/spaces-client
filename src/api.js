import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// import jwtDecode from "jwt-decode";

// const API_BASE_URL = "http://localhost:4000/api/v1"; //should be in .env
const API_BASE_URL = process.env.BACKEND_URL; //should be in .env
// const authToken = JSON.parse(localStorage.getItem("authToken"));

export const fetchHabits = async (id, authToken) => {
    try {
        console.log(authToken);
        const res = await axios.get(`${API_BASE_URL}/habits/all`, {
            params: { id },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log("res.data: ", res.data);
        console.log(res);
        return res.data;
    } catch (err) {
        console.log("Error fetching habits:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};

export const fetchJournal = async (id, authToken) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/journal`, {
            params: { id },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log("res.data: ", res.data);
        console.log(res);
        return res.data;
    } catch (err) {
        console.log("Error fetching journal:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};

export const fetchHabit = async (habitId, authToken) => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/habits?habitId=${habitId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        console.log("res.data: ", res.data);
        return res.data;
    } catch (err) {
        console.log("Error fetching habit:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};

export const createHabit = async (habit, userId, authToken) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/habits/create`,
            { habit, userId },
            {
                headers: { Authorization: `Bearer ${authToken}` },
            }
        );
        console.log(response.data);
    } catch (err) {
        console.error("Error submitting habit:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};

export const submitHabitEntry = async (
    habitId,
    habitRepeat,
    onEntry,
    authToken
) => {
    const response = await axios.post(
        `${API_BASE_URL}/habits/log/`,
        {
            habitId,
            habitRepeat: habitRepeat ? habitRepeat : "Weekly",
        },
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }
    );
    console.log(response.data);
    onEntry();
    // props.onEntryLog();
};

export const submitJournalEntry = async (entry, userId, authToken) => {
    await axios
        .post(
            `${API_BASE_URL}/journal/entry`,
            {
                journalEntry: entry,
                userId: userId,
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
        .then((res) => {
            console.log("response saved", res);
        })
        .catch((err) => {
            console.log("Error saving journal", err);
            if (err.status === 401) {
                localStorage.removeItem("user");
                localStorage.removeItem("authToken");
            }
        });
};

export const removeHabitEntry = async (habit, onEntry, authToken) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/habits/dellog/`, {
            data: { habit: habit },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log(response.data);
        onEntry();
        // props.onEntryLog();
    } catch (err) {
        console.error("Error submitting habit:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};

export const deleteHabit = async (habitId, onEntry, authToken) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/habits?habitId=${habitId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        console.log(response.data);
        onEntry();
        // props.setIdToOpen(null);
        // props.setEditForm((prev) => !prev);
    } catch (err) {
        console.error("Error submitting habit:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};
export const editHabit = async (habitToEdit, authToken) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/habits/update`,
            { habit: habitToEdit },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        console.log(response.data);
        // props.onEntryLog();
        // props.setEditForm((prev) => !prev);
    } catch (err) {
        console.error("Error updating habit:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};

export const changeTheme = async (id, theme, authToken) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/user/theme`,
            {
                id,
                theme,
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        console.log(response.data);
    } catch (err) {
        console.error("Error updating theme:", err);
        if (err.status === 401) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("authToken");
        }
        throw err;
    }
};
