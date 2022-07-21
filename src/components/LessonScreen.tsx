import { Player, Youtube } from "@vime/react";
import {
    CaretRight,
    DiscordLogo,
    FileArrowDown,
    Lightning,
} from "phosphor-react";
import React from "react";
import "../styles/scrollbar.css";

import "@vime/core/themes/default.css";
import { useGetLessonBySlugQuery } from "../graphql/generated";
import Footer from "./Footer";
import Loading from "./Loading";

type LessonScreenProps = {
    lessonSlug: string;
};

export default function LessonScreen({ lessonSlug }: LessonScreenProps) {
    const { data } = useGetLessonBySlugQuery({
        variables: { slug: lessonSlug },
        fetchPolicy: "no-cache",
    });

    if (!data || !data.lesson) {
        return (
            <div className="flex-1">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col max-h-[calc(100vh-75px)] overflow-y-scroll scrollbar scrollbar-primary">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player controls>
                        <Youtube videoId={data.lesson.videoId} cookies />
                    </Player>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-between p-8 max-w-[1100px] mx-auto">
                <div className="flex flex-col items-start gap-6 sm:gap-16 sm:flex-row">
                    <div className="flex-1">
                        <h1 className="text-lg font-bold lg:text-2xl">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-sm text-gray-200 leading-relaxed lg:text-base">
                            {data.lesson.description}
                        </p>

                        {data.lesson.teacher && (
                            <div className="flex items-center gap-4 mt-6">
                                <img
                                    src={data.lesson.teacher.avatarURL}
                                    alt="Imagem do professor"
                                    className="h-16 w-16 rounded-full border-2 border-blue-500"
                                />

                                <div className="leading-relaxed">
                                    <strong className="text-lg font-bold block lg:text-2xl">
                                        {data.lesson.teacher.name}
                                    </strong>
                                    <span className="text-gray-200 text-sm block">
                                        {data.lesson.teacher.bio}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="
                        w-full flex flex-col gap-4 
                        sm:max-w-[260px]
                    ">
                        <a
                            href="#"
                            className="flex items-center p-4 rounded text-sm bg-green-500  font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
                        >
                            <DiscordLogo size={24} />
                            Comunidade do Discord
                        </a>

                        <a
                            href="#"
                            className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
                        >
                            <Lightning size={24} />
                            Acesse o desafio
                        </a>
                    </div>
                </div>

                <div className="gap-8 my-16 grid md:grid-cols-2 lg:my-20">
                    <a
                        href="#"
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
                    >
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-lg sm:text-2xl">
                                Material complementar
                            </strong>
                            <p className="text-xs text-gray-200 mt-2 sm:text-sm">
                                Acesse o material complementar para acelerar o
                                seu desenvolvimento
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>

                    <a
                        href="#"
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
                    >
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-lg sm:text-2xl">
                                Wallpaper exclusivos
                            </strong>
                            <p className="text-xs text-gray-200 mt-2 sm:text-sm">
                                Baixe wallpapers exclusivos do Ignite Lab e
                                personalize a sua máquina
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>

                <Footer />
            </div>
        </div>
    );
}
