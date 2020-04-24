import React from 'react'
import { Normalize } from "styled-normalize"
import { Routes } from "./routes"
import { AccountLoader } from "./features/profile"
import ErrorBoundary from "./lib/ErrorBoundary"
// import { ToggleThemeProvider } from "lib/theme-context"
import { GlobalStyles } from "./global-styles"
import { lightTheme } from "ui/themes/light"
import { darkTheme } from "ui/themes/dark"

export const App = () => (
    <ErrorBoundary>
        <Normalize />
        <GlobalStyles />
        <AccountLoader>
            <Routes />
        </AccountLoader>
    </ErrorBoundary>
)