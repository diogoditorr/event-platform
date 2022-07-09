import { FirebaseError } from "firebase/app";
import {
    getRedirectResult,
    GithubAuthProvider,
    OAuthCredential,
    signInWithRedirect,
    UserCredential,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";

export type TypeRedirectError =
    | RedirectResultError
    | FirebaseError
    | Error
    | null;

class RedirectResultError extends Error {}

const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user");

export default function useGithubAuth() {
    const [result, setResult] = useState<UserCredential | null>(null);
    const [credential, setCredential] = useState<OAuthCredential | null>(null);
    const [error, setError] = useState<TypeRedirectError>(null);

    async function verifyRedirectResult() {
        let shouldConnect = true;
        let error: TypeRedirectError = null;

        try {
            const result = await getRedirectResult(auth);
            if (!result) {
                throw new RedirectResultError("No redirect result");
            }

            const credential = GithubAuthProvider.credentialFromResult(result);
            if (!credential) {
                throw new RedirectResultError("No credential");
            }

            setCredential(credential);
            setResult(result);
        } catch (redirectError) {
            if (redirectError instanceof FirebaseError) {
                error = redirectError;
                shouldConnect = false;
            } else if (redirectError instanceof RedirectResultError) {
                error = redirectError;
            } else {
                shouldConnect = false;
            }
            setError(error);
        }

        return {
            shouldConnect,
        };
    }

    useEffect(() => {
        async function authenticate() {
            const { shouldConnect } = await verifyRedirectResult();

            if (shouldConnect) {
                await signInWithRedirect(auth, githubProvider);
            }
        }

        const delay = setTimeout(() => {
            authenticate();
        }, 1000);

        return () => {
            clearTimeout(delay);
        };
    }, []);

    return {
        result,
        credential,
        error,
    };
}
