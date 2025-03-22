import React, { useState } from "react";
import closeSvg from "../icons/close.svg";
import { changeTheme } from "../api";
import { useAuth } from "../context/authState";

function Profile(props) {
    const { user, theme, setTheme, authToken, handleLogout } = useAuth();
    // const [theme, setTheme] = useState(props.theme);

    const handleChange = async (event) => {
        setTheme(parseInt(event.target.value));
        console.log(event.target);
        localStorage.setItem("theme", event.target.value);
        await changeTheme(user.id, parseInt(event.target.value), authToken);
    };
    return (
        <div className="pop">
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "20px 0px",
                }}
            >
                <img
                    src={closeSvg}
                    onClick={() => {
                        props.setPop(false);
                    }}
                />
            </div>
            <h1
                style={{
                    fontSize: "32px",
                    fontWeight: 300,
                    textAlign: "center",
                }}
            >
                Hey {user.username}.
            </h1>
            <form>
                <div style={{}}>Theme</div>
                <div style={{ display: "flex", gap: "5px" }}>
                    {[
                        "Void Starfall",
                        "Dreamy Paws",
                        "Blush Horizon",
                        "Solar Room",
                        "Scarlet Red",
                    ].map((val, index) => (
                        <label key={val} className="radio">
                            <input
                                type="radio"
                                name="theme"
                                value={index}
                                checked={theme === index}
                                onChange={handleChange}
                            />
                            <span>{val}</span>
                        </label>
                    ))}
                </div>
            </form>
            <form>
                <div
                    onClick={() => {
                        handleLogout();
                        props.setIsLogged(false);
                    }}
                >
                    Logout
                </div>
            </form>
        </div>
    );
}

export default Profile;
