import React from "react";
import { useParams } from "react-router-dom";
import ReactJSIcon from "../assets/ReactJSIcon";
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
                {slug ? (
                    <LessonScreen lessonSlug={slug} />
                ) : (
                    <div className="flex-1">
                        <div className="flex flex-col items-center mt-16">
                            <ReactJSIcon width="80%" />
                            <p className="mt-6 text-blue-400 text-2xl font-mono">
                                Selecione uma aula para começar!
                            </p>
                        </div>
                    </div>
                )}
                <Lessons />
            </main>
        </div>
    );
}
