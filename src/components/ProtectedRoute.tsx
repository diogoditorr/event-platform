import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
    isAllowed: boolean;
    redirectPath?: string;
    fallback?: {
        element: ReactNode;
        deps: boolean[];
    };
    children?: ReactNode;
};

export default function ProtectedRoute({
    isAllowed,
    redirectPath = "/",
    fallback,
    children,
}: Props) {
    if (fallback) {
        if (fallback.deps.some((dep) => dep)) {
            return <>{fallback.element}</>;
        }
    }

    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? <>children</> : <Outlet />;
}
