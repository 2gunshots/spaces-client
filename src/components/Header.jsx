import React, { useState } from "react";
import spacesSvg from "../icons/spaces.svg";
import { Link } from "react-router-dom";
import profileSvg from "../icons/profile.svg";
import Profile from "./Profile";

function Header(props) {
    const [pop, setPop] = useState(false);
    return (
        <div className="header">
            {/* <h1>Spaces</h1> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <div>
                    <Link to="/home">
                        <img src={spacesSvg} height="40px" width="auto" />
                    </Link>
                </div>
                <div
                    style={{
                        cursor: "pointer",
                        borderRadius: "100px",
                        display: "flex",
                    }}
                >
                    <img
                        src={profileSvg}
                        height="90px"
                        width="auto"
                        onClick={() => {
                            setPop(true);
                        }}
                    />
                    {/* <div
                        style={{
                            fontSize: "28px",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {props.user.username}
                    </div> */}
                </div>
            </div>
            {pop && <Profile setPop={setPop} setIsLogged={props.setIsLogged} />}
        </div>
    );
}

export default Header;
