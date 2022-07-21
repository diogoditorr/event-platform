import React from "react";

type Props = {
    width?: number;
    height?: number;
}

export function CloseMenuIcon({ width, height }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 32 32"
        >
            <path
                stroke="#81D8F7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 8l15.556 15.556M8 24L23.556 8.444"
            ></path>
        </svg>
    );
}
