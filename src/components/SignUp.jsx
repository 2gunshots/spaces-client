import React, { useRef, useState, useEffect } from "react";
import MindFuckButton from "./experimental/Button";
import eyeSvg from "../icons/eye.svg";
import axios from "axios";

function SignupPage(props) {
    const USERNAME_REGEX = /^[a-z][a-z0-9]{3,20}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const PWD_REGEX =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8, 24}$/;
    const PWD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/;
    // const userRef = useRef();
    const errRef = useRef();

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState();
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState();
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState("");

    const [passSelect, setPassSelect] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setTimeout(() => {
            setShowPassword(false);
        }, 3000);
    };

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const result = USERNAME_REGEX.test(newUser.username);
        console.log("Username res: ", result);
        setValidName(result);
    }, [newUser.username]);
    useEffect(() => {
        const result = EMAIL_REGEX.test(newUser.email);
        console.log("Email res: ", result);
        setValidEmail(result);
    }, [newUser.email]);
    useEffect(() => {
        console.log("Password being tested: ", newUser.password);
        const result = PWD_REGEX.test(newUser.password);
        console.log("Password regex result: ", result);
        setValidPass(result);
    }, [newUser.password]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser((prevValues) => {
            return { ...prevValues, [name]: value };
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/register",
                { newUser: newUser }
            );
            console.log(response.data);
            if (response.status === 201) {
                setErr(response.data);
                props.setWhichForm(false);
            }
        } catch (err) {
            if (!err.response) {
                setErr("No response from the server. Check your connection.");
            } else {
                const { status, data } = err.response;
                if (status === 201) {
                    setErr(data);
                }
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
                Join Spaces.
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
                            placeholder="Username"
                            value={newUser.username}
                            onChange={handleChange}
                            onBlur={() => {
                                setUserFocus(true);
                            }}
                            required
                            style={{
                                borderColor: userFocus
                                    ? validName
                                        ? "#f5f5f5"
                                        : "maroon"
                                    : "#f5f5f599",
                            }}
                        />
                    </div>
                    <div className="inputBox">
                        {/* <label htmlFor="">Email</label> <br /> */}
                        <input
                            autoComplete="off"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={handleChange}
                            onBlur={() => {
                                setEmailFocus(true);
                            }}
                            required
                            style={{
                                borderColor: emailFocus
                                    ? validEmail
                                        ? "#f5f5f5"
                                        : "maroon"
                                    : "#f5f5f599",
                            }}
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
                            value={newUser.password}
                            onChange={handleChange}
                            onClick={() => {
                                setPassSelect(true);
                            }}
                            onBlur={() => {
                                setPassFocus(true);
                                setPassSelect(false);
                            }}
                            required
                            style={{
                                borderColor: passFocus
                                    ? validPass
                                        ? "#f5f5f5"
                                        : "maroon"
                                    : "#f5f5f599",
                            }}
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
                        {err.length === 0
                            ? !userFocus && !emailFocus && !passFocus
                                ? "Enter a valid username, email and password"
                                : !validName
                                ? "Username may only contain lowercase alphanumeric characters"
                                : !validEmail
                                ? "Email must be in format user@example.com"
                                : !validPass
                                ? "Password should be at least 8 characters including a number, a lowercase letter, and a symbol."
                                : "Register to create an account"
                            : err}
                    </div>
                    <div className="inputBox">
                        <button
                            type="submit"
                            disabled={!validName || !validEmail || !validPass}
                        >
                            <MindFuckButton
                                id={1}
                                text="Register"
                                width={365}
                                height={60}
                                radius={280}
                                type="submit"
                                background="linear-gradient(140deg, rgba(39,33,58,1) 16%, rgba(79,67,119,1) 51%, rgba(156,138,212,1) 100%)"
                            />
                        </button>
                    </div>
                </form>
                <div
                    className="inputBox"
                    style={{
                        fontSize: "13px",
                        textAlign: "center",
                        margin: "10px",
                    }}
                >
                    Already have an account?{" "}
                    <button
                        style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "underline",
                        }}
                        onClick={() => {
                            props.setWhichForm(false);
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
