import React from "react";
import LogoRocketseat from "./LogoRocketseat";

export default function Footer() {
    return (
        <div className="flex items-center justify-between pt-6 border-t border-t-gray-500 text-gray-300">
            <div className="flex items-center gap-6">
                <LogoRocketseat />
                Rocketseat - Todos os direitos reservados
            </div>
            <a href="#" className="hover:underline">
                Políticas de privacidade
            </a>
        </div>
    );
}
