import { FirebaseError } from "firebase/app";
import {
    getRedirectResult,
    GithubAuthProvider,
    OAuthCredential,
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

export default function useProviderRedirectAuth() {
    const [result, setResult] = useState<UserCredential | null>(null);
    const [credential, setCredential] = useState<OAuthCredential | null>(null);
    const [error, setError] = useState<TypeRedirectError>(null);

    async function verifyRedirectResult() {
        let error: TypeRedirectError = null;
        let credential: OAuthCredential | null = null;

        try {
            const result = await getRedirectResult(auth);
            if (!result) {
                throw new RedirectResultError("No redirect result");
            }

            if (result.providerId === "github.com") {
                credential = GithubAuthProvider.credentialFromResult(result);
            }

            if (!credential) {
                throw new RedirectResultError("No credential");
            }

            setResult(result);
            setCredential(credential);
        } catch (redirectError) {
            if (redirectError instanceof FirebaseError) {
                error = redirectError;
            } else if (redirectError instanceof RedirectResultError) {
                error = redirectError;
            }
            setError(error);
        }
    }

    useEffect(() => {
        async function execute() {
            await verifyRedirectResult();
        }

        const delay = setTimeout(execute, 1000);
        
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
