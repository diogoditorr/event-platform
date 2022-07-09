import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticateGithub from "./components/AuthenticateGithub";
import Event from "./pages/Event";
import Subscribe from "./pages/Subscribe";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Subscribe />} />
            <Route path="/event" element={<Event />} />
            <Route path="/event/lesson/:slug" element={<Event />} />
            <Route path="/auth/callback/github" element={<AuthenticateGithub />} />
        </Routes>
    );
}
