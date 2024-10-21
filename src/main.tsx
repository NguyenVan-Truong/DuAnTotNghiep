import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../src/Styles/global.css";
import "@mantine/core/styles.css"; //import Mantine V7 styles needed by MRT
import "@mantine/dates/styles.css"; //if using mantine date picker features
import "mantine-react-table/styles.css"; //import MRT styles
import App from "./App.tsx";

import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
const queryClient = new QueryClient();

const theme = createTheme({
    /** Put your mantine theme override here */
});
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <Notifications />
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
