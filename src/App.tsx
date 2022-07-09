import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ReactQueryDevtools } from "react-query/devtools";
import './services/firebase';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <AuthContextProvider>
                        <Router />
                    </AuthContextProvider>
                </BrowserRouter>
            </ApolloProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
