import React, { useEffect, useState } from "react";
import useGithubAuth from "../hooks/useGithubAuth";

export default function AuthenticateGithub() {
    const { result, credential, error } = useGithubAuth();

    if (result) {
        console.log(result);
        console.log(credential);
    }

    if (error) {
        console.log(error);
    }

    return <div>{!error ? "Redirecting..." : error.toString()}</div>;
}
