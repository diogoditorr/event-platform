import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLoading from "./components/AppLoading";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import Event from "./pages/Event";
import Subscribe from "./pages/Subscribe";

export default function Router() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <AppLoading />;
    }

    return (
        <Routes>
            <Route path="/" element={<Subscribe />} />
            <Route element={<ProtectedRoute
                isAllowed={isAuthenticated}
            />}>
                <Route path="/event" element={<Event />} />
                <Route path="/event/lesson/:slug" element={<Event />} />
            </Route>
        </Routes>
    );
}
