import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "../src/Styles/global.css";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MantineProvider>
            <ModalsProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </QueryClientProvider>
            </ModalsProvider>
        </MantineProvider>
    </React.StrictMode>,
);
