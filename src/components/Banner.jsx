import React from "react";
import theme0 from "../images/theme0.png";
// import spaceImage from "../images/theme1.png";
import theme1 from "../images/theme1.png";
import theme2 from "../images/theme2.png";
import theme3 from "../images/theme3.png";
import theme4 from "../images/theme4.png";
import { useAuth } from "../context/authState";

function Banner() {
    const { theme } = useAuth();

    const renderTheme = (n) => {
        console.log("theme: ", theme);
        switch (n) {
            case 0:
                return theme0;
            case 1:
                return theme1;
            case 2:
                return theme2;
            case 3:
                return theme3;
            case 4:
                return theme4;
            default:
                return theme0;
        }
    };

    console.log("theme: ", theme);
    return (
        <div className="banner">
            <img
                src={renderTheme(theme)}
                alt="animated space"
                style={
                    {
                        // backgroundImage: `url("../images/theme${props.theme}.png")`,
                    }
                }
            />
        </div>
    );
}

export default Banner;
