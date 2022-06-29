import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Lessons from "../components/Lessons";
import LessonScreen from "../components/LessonScreen";

type Params = {
    slug: string;
};

export default function Event() {
    const { slug } = useParams<Params>();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1">
                {slug ? <LessonScreen lessonSlug={slug} /> : <div className="flex-1" />}
                <Lessons />
            </main>
        </div>
    );
}
