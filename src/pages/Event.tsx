import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Lesson from "../components/Lesson";
import Sidebar from "../components/Sidebar";
import Video from "../components/Video";

type Params = {
    slug: string;
};

export default function Event() {
    const { slug } = useParams<Params>();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1">
                {slug ? <Video lessonSlug={slug} /> : <div className="flex-1" />}
                <Sidebar />
            </main>
        </div>
    );
}
