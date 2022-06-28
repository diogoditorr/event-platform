import React from "react";
import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

type LessonProps = {
    title: string;
    slug: string;
    availableAt: Date;
    type: "live" | "class";
};

export default function Lesson({
    title,
    slug,
    availableAt,
    type,
}: LessonProps) {
    const params = useParams<{ slug: string }>();

    const isLessonAvailable = isPast(availableAt);
    const availableDateFormatted = format(
        availableAt,
        "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
        {
            locale: ptBR,
        }
    );

    const isSelectedLesson = slug === params.slug;

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        if (!isLessonAvailable) {
            event?.preventDefault();
        }
    }

    return (
        <Link
            to={`/event/lesson/${slug}`}
            onClick={handleClick}
            className={classNames("group", {
                "cursor-not-allowed": !isLessonAvailable,
            })}
        >
            <span className="text-gray-300">{availableDateFormatted}</span>

            <div className="relative">
                <div
                    className={classNames(
                        "rounded border border-gray-500 p-4 mt-2",
                        {
                            "bg-green-500": isSelectedLesson,
                            "after:absolute after:border-x-[7px] after:border-y-[7px] after:border-green-500 after:top-[calc(50%-0.21875rem)] after:left-[-0.25rem] after:rotate-45 after:rounded-sm":
                                isSelectedLesson,
                            "group-hover:border-green-500": isLessonAvailable,
                        }
                    )}
                >
                    <header className="flex items-center justify-between">
                        {isLessonAvailable ? (
                            <span
                                className={classNames(
                                    "text-sm font-medium flex items-center gap-2",
                                    {
                                        "text-white": isSelectedLesson,
                                        "text-blue-500": !isSelectedLesson,
                                    }
                                )}
                            >
                                <CheckCircle size={20} />
                                Conteúdo liberado
                            </span>
                        ) : (
                            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                                <Lock size={20} />
                                Em breve
                            </span>
                        )}

                        <span
                            className={classNames(
                                "text-xs font-bold rounded py-[0.125rem] px-2 text-white border",
                                {
                                    "border-white": isSelectedLesson,
                                    "border-green-300": !isSelectedLesson,
                                    "text-green-300": !isSelectedLesson && !isLessonAvailable,
                                }
                            )}
                        >
                            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
                        </span>
                    </header>

                    <strong
                        className={classNames("mt-5 block", {
                            "text-white": isSelectedLesson,
                            "text-gray-200": !isSelectedLesson,
                        })}
                    >
                        {title}
                    </strong>
                </div>
            </div>
        </Link>
    );
}
