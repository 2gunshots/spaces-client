import React, { useRef, useState, useEffect } from "react";
import MindFuckButton from "./experimental/Button";
import MindFuckGradientButton from "./gradientButton";
import eyeSvg from "../icons/eye.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authState";

function LoginPage(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState("Login with your credentials");
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setTimeout(() => {
            setShowPassword(false);
        }, 3000);
    };

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevValues) => {
            return { ...prevValues, [name]: value };
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/signin",
                { user: user }
            );
            console.log(response.data);

            // localStorage.setItem(
            //     `authToken`,
            //     JSON.stringify(response.data.token)
            // );
            handleLogin(
                response.data.token,
                response.data.user,
                response.data.theme
            );

            console.log("token: ", response.data.token);

            if (response.status === 201) {
                setErr(response.data);
            }

            // props.handleLogin(response.data.user);
            // setTimeout(() => {
            navigate("/");
            props.setIsLogged(true);
            // }, 500);
        } catch (err) {
            if (!err.response) {
                setErr("No response from the server. Check your connection.");
            } else {
                const { status, data } = err.response;
                setErr(data);
            }
            console.error("Error submitting :", err);
        }
    };
    return (
        <div
            style={{
                padding: "0px 50px 0px 50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexFlow: "column",
            }}
        >
            <h3
                style={{
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: 300,
                    marginBottom: "10px",
                }}
            >
                Welcome Back.
            </h3>
            <div style={{ padding: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        {/* <label htmlFor="">Username</label> <br /> */}
                        <input
                            // ref={userRef}
                            autoComplete="off"
                            name="username"
                            type="text"
                            placeholder="Username or Email"
                            value={user.username}
                            onChange={handleChange}
                            required
                            // style={{
                            //     borderColor: userFocus
                            //         ? validName
                            //             ? "#f5f5f5"
                            //             : "maroon"
                            //         : "#f5f5f599",
                            // }}
                        />
                    </div>

                    <div
                        className="inputBox"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row-reverse",
                        }}
                    >
                        {/* <label htmlFor="">Password</label> <br /> */}
                        <input
                            autoComplete="off"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            // style={{
                            //     borderColor: passFocus
                            //         ? validPass
                            //             ? "#f5f5f5"
                            //             : "maroon"
                            //         : "#f5f5f599",
                            // }}
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            style={{
                                position: "absolute",
                                marginRight: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <img
                                src={eyeSvg}
                                style={{
                                    opacity: "50%",
                                    cursor: "pointer",
                                }}
                            />
                        </span>
                    </div>
                    <div
                        className="inputBox"
                        style={{
                            width: "385px",
                            fontSize: "13px",
                            fontWeight: 400,
                            marginTop: "20px",
                            marginBottom: "25px",
                            opacity: "50%",
                            // textAlign: "center",
                        }}
                    >
                        {err}
                    </div>
                    <div className="inputBox">
                        <button type="submit">
                            <MindFuckButton
                                id={1}
                                text="Sign in"
                                width={365}
                                height={60}
                                radius={280}
                                type="submit"
                            />
                            {/* <MindFuckGradientButton
                                id={1}
                                text="Sign in"
                                width={365}
                                height={60}
                                radius={280}
                                type="submit"
                            /> */}
                        </button>
                    </div>
                    <div
                        className="inputBox"
                        style={{
                            fontSize: "13px",
                            textAlign: "center",
                            margin: "10px",
                        }}
                    >
                        No account?{" "}
                        <button
                            style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                textDecoration: "underline",
                            }}
                            onClick={() => {
                                props.setWhichForm(true);
                            }}
                        >
                            Create one
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
