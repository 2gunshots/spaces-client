import React, { useState, useEffect } from "react";

const DeviceCheck = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the device is mobile
        const checkIfMobile = () => {
            const userAgent =
                navigator.userAgent || navigator.vendor || window.opera;

            // Regular expression to detect mobile devices
            const mobileRegex =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

            // Check if screen width is less than typical tablet width
            const isSmallScreen = window.innerWidth < 1280;

            setIsMobile(mobileRegex.test(userAgent) || isSmallScreen);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for resize events
        window.addEventListener("resize", checkIfMobile);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    if (isMobile) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100vh",
                    justifyContent: "center",
                }}
            >
                <div>
                    <h2 style={{ textAlign: "center", fontSize: "32px" }}>
                        Desktop Only
                    </h2>
                    <p className="mb-4">
                        This website is designed for desktop viewing only.
                        Please access it from a computer for the best
                        experience.
                    </p>
                    <p className="text-sm text-gray-400">
                        Screen width: {window.innerWidth}px
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
export default DeviceCheck;

// // App wrapper to implement the mobile detection
// const App = () => {
//     return (
//         <DeviceCheck>
//             {/* Your entire app content goes here */}
//             <div className="p-6">
//                 <h1 className="text-2xl font-bold">Your Website Content</h1>
//                 <p>This content will only be visible on desktop devices.</p>
//             </div>
//         </DeviceCheck>
//     );
// };

// export default App;
