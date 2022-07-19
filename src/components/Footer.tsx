import React from "react";
import LogoRocketseat from "./LogoRocketseat";

export default function Footer() {
    return (
        <div
            className="flex flex-col items-center pt-6 border-t border-t-gray-500 text-gray-300 gap-2
            sm:flex-row sm:justify-between
        "
        >
            <div
                className="flex flex-col items-center gap-4 text-center
                sm:flex-row sm:gap-6 sm:text-left
            "
            >
                <LogoRocketseat />
                Rocketseat - Todos os direitos reservados
            </div>
            <a href="#" className="sm:hover:underline">
                Políticas de privacidade
            </a>
        </div>
    );
}
