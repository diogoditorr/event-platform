import React, { useState } from "react";
import ReactJSIcon from "../assets/ReactJSIcon";

export default function Loading() {
    const [dots, setDots] = useState(0);
    const maxDots = 3;

    if (dots <= maxDots) {
        setTimeout(() => {
            setDots(dots + 1);
        }, 500);
    } else {
        setDots(0);
    }

    return (
        <div className="flex flex-col items-center mt-16">
            <ReactJSIcon width="80%" />
            <p className="mt-6 text-blue-400 text-2xl font-mono">
                Carregando
                {Array.from({ length: maxDots }).map((_, i) => {
                    return (
                        <span key={i} className={i >= dots ? "invisible" : ""}>
                            .
                        </span>
                    );
                })}
            </p>
        </div>
    );
}
