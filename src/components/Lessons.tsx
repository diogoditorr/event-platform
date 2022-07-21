import React from "react";
import { GetLessonsQuery } from "../graphql/generated";
import Lesson from "./Lesson";
import "../styles/scrollbar.css";

type Props = {
    data: GetLessonsQuery | undefined;
}

export default function Lessons({ data }: Props) {
    return (
        <div className="w-full max-h-[calc(100vh-75px)] p-6 pb-16 bg-gray-700 border-l border-gray-600 
        overflow-y-scroll scrollbar scrollbar-primary
        lg:w-[348px]
        ">
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
        </div>
    );
}
