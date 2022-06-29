import React from "react";
import { useGetLessonsQuery } from "../graphql/generated";
import Lesson from "./Lesson";
import "../styles/scrollbar.css";

export default function Sidebar() {
    const { data } = useGetLessonsQuery();

    return (
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600 max-h-[calc(100vh-75px)] overflow-y-scroll scrollbar scrollbar-primary">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map((lesson) => {
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                        />
                    );
                })}
            </div>
        </aside>
    );
}
