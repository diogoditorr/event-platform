import React from "react";
import { AppLogo } from "./AppLogo";

export default function Header() {
    return (
        <header className="w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-600">
            <AppLogo />
        </header>
    );
}
