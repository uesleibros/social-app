/**
 * MainStructure Component
 * 
 * This component serves as the main layout structure for the page, providing
 * a styled container for the content passed as children. It includes responsive
 * design features like rounded corners, borders, and background color adjustments
 * based on the screen size and theme (light/dark mode).
 * 
 * Props:
 * - children (ReactNode): The content to be displayed inside the main structure.
 * - className (string): Optional additional class names to be applied to the main container.
 * 
 * Features:
 * - The component applies different styles for varying screen sizes, adjusting 
 *   height, border, and layout responsiveness. 
 * - Displays the `BottomSideBar` component on small screens (hidden on larger screens).
 * 
 * Usage:
 * <MainStructure className="custom-class">
 *   <YourContent />
 * </MainStructure>
 */
"use client"


import { useEffect, useState } from "react";
import { getCookieFromDOM } from "@/utils/getCookieFromDOM";
import LoggedInBottomSideBar from "./Sidebars/BottomSideBar/LoggedInBottomSideBar";
import UnloggedInBottomSideBar from "./Sidebars/BottomSideBar/UnloggedInBottomSideBar";

export default function MainStructure({ children, className }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 

    useEffect(() => {
        const loggedInCookie = getCookieFromDOM(document, "LoggedIn"); //this is a initial temporary test implementation until we finish the authentication system.
        setIsLoggedIn(loggedInCookie === "true");
    }, []);

    return (
        <main className={`bg-gray-50 dark:bg-zinc-900 sm:border-b sm:border-l border-gray-200 sm:max-[1000px]:border-r sm:border-t dark:border-zinc-800 sm:max-h-[100vh] sm:min-h-[100vh] max-[1000px]:min-h-[90vh] max-[1000px]:max-h-[90vh] overflow-y-auto ${className}`}>
            {children}
            <div className="sm:hidden mt-10 max-[640px]:visible">
                {isLoggedIn === null ? null : (isLoggedIn ? <LoggedInBottomSideBar /> : <UnloggedInBottomSideBar />)}
            </div>
        </main>
    );
}

