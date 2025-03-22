import React from "react";
import GradientBackground from "./experimental/Gradient";

function Background() {
    return (
        <div className="background">
            <div className="noise" />
            <div className="glass"></div>
            <GradientBackground color={"#2F233E"} diameter={150} />
            {/* <GradientBackground color={"#27213A"} diameter={500} /> */}
            <GradientBackground color={"#1B203B"} diameter={250} />
        </div>
    );
}

export default Background;
