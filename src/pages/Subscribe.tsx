import { signInAnonymously } from "firebase/auth";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import codingExampleURL from "../assets/coding-example.png";
import { AppLogo } from "../components/AppLogo";
import AuthenticateGithubButton from "../components/AuthenticateGithubButton";
import Footer from "../components/Footer";
import { useCreateSubscriberMutation } from "../graphql/generated";
import useProviderRedirectAuth from "../hooks/useProviderRedirectAuth";
import { auth } from "../services/firebase";

export default function Subscribe() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { result } = useProviderRedirectAuth();
    const [createSubscriber, { loading }] = useCreateSubscriberMutation();
    const navigate = useNavigate();

    if (result?.user) {
        return <Navigate to="/event" replace />;
    }

    async function handleSubscribe(e: React.FormEvent) {
        e.preventDefault();

        await signInAnonymously(auth);

        const response = await createSubscriber({
            variables: {
                name,
                email,
            },
        });

        if (response.errors) {
            console.log(response.errors);
        }

        navigate("/event", { replace: true });
    }

    return (
        <>
            <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
                <div
                    className="
                    w-full max-w-[1100px] flex flex-col items-center mt-20 mx-auto 
                    lg:flex-row lg:justify-between
                "
                >
                    <div className="max-w-[640px] flex flex-col items-center px-8 mb-8 text-center 
                    lg:text-left lg:items-start lg:mb-0
                    ">
                        <AppLogo />

                        <h1 className="mt-8 text-[1.875rem] leading-tight md:text-[2.5rem]">
                            Construa uma{" "}
                            <strong className="text-blue-500">
                                aplicação completa
                            </strong>
                            , do zero, com{" "}
                            <strong className="text-blue-500">React</strong>
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed text-sm md:text-base">
                            Em apenas uma semana você vai dominar na prática uma
                            das tecnologias mais utilizadas e com alta demanda
                            para acessar as melhores oportunidades do mercado.
                        </p>
                    </div>
                    <div
                        className="
                        w-full p-8 bg-gray-700 border-y border-gray-500
                        md:w-auto md:border md:rounded lg:mr-8
                    "
                    >
                        <strong className="text-lg mb-6 block md:text-2xl">
                            Inscreva-se gratuitamente
                        </strong>

                        <form
                            onSubmit={handleSubscribe}
                            className="flex flex-col gap-2 w-full text-sm md:text-base"
                        >
                            <input
                                type="text"
                                placeholder="Seu nome completo"
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-gray-900 rounded px-5 h-14 focus:outline-none focus:border focus:border-green-500 focus:invalid:border-red-500"
                            />
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-gray-900 rounded px-5 h-14 focus:outline-none focus:border focus:border-green-500 focus:invalid:border-red-500"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                Garantir minha vaga
                            </button>
                        </form>
                        <div className="my-3 flex justify-center font-bold text-sm">
                            Ou
                        </div>
                        <AuthenticateGithubButton />
                    </div>
                </div>

                <div className="flex mb-10 px-2 lg:mt-10">
                    <img src={codingExampleURL} alt="Image showing the Visual Studio Code IDE" />
                </div>
            </div>

            <div className="pb-6 sm:px-6">
                <Footer />
            </div>
        </>
    );
}
