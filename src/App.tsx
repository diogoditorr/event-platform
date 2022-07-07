import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
    return (
        <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <BrowserRouter>
                        <Router />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </BrowserRouter>
                </AuthContextProvider>
            </QueryClientProvider>
        </ApolloProvider>
    );
}

export default App;
