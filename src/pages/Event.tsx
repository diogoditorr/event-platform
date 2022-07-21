import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactJSIcon from "../assets/ReactJSIcon";
import { AppLogo } from "../components/AppLogo";
import { MenuIcon } from "../components/MenuIcon";
import Lessons from "../components/Lessons";
import LessonScreen from "../components/LessonScreen";
import { useGetLessonsQuery } from "../graphql/generated";
import { CloseMenuIcon } from "../components/CloseMenuIcon";

type Params = {
    slug: string;
};

export default function Event() {
    const { slug } = useParams<Params>();
    const { data } = useGetLessonsQuery();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <header
                className="
                w-full px-6 py-5 flex items-center justify-between bg-gray-700 border-b border-gray-600 
                lg:justify-center
            "
            >
                <AppLogo className="h-6 lg:h-[34px]" />

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2  text-sm lg:hidden"
                >
                    <p>Aulas</p>
                    {!isOpen ? <MenuIcon /> : <CloseMenuIcon height={32} width={32} />}
                </button>
            </header>

            <main className="flex flex-1">
                {slug ? (
                    <LessonScreen lessonSlug={slug} />
                ) : (
                    <div className="flex-1 max-h-[calc(100vh-75px)] overflow-y-scroll scrollbar scrollbar-primary">
                        <div className="flex flex-col items-center mt-16 p-4">
                            <ReactJSIcon width="80%" className="max-w-2xl" />
                            <p className="mt-6 mb-12 text-blue-400 text-lg text-center font-mono sm:text-2xl">
                                Selecione uma aula para começar!
                            </p>
                        </div>
                    </div>
                )}
                <aside className="hidden lg:block">
                    <Lessons data={data} />
                </aside>
                {isOpen && (
                    <div className="w-full absolute lg:hidden">
                        <Lessons data={data} />
                    </div>
                )}
            </main>
        </div>
    );
}
