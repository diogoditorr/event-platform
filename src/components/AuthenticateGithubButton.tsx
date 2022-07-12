import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import React from "react";
import { auth } from "../services/firebase";
import { MdiGithub } from "./GithubLogo";

const githubProvider = new GithubAuthProvider();

export default function AuthenticateGithubButton() {
    return (
        <button
            className="flex items-center justify-center w-full p-3 rounded-[40px] gap-2 text-base font-bold bg-white text-gray-600 hover:bg-gray-100 transition-colors ease-in-out"
            onClick={async () => await signInWithRedirect(auth, githubProvider)}
        >
            <MdiGithub height={32} width={32} />
            Entrar com o GitHub
        </button>
    );
}
