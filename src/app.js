import React from 'react'
import { Normalize } from "styled-normalize"
import { Routes } from "./routes"
import { AccountLoader } from "features/profile"
import ErrorBoundary from "lib/ErrorBoundary"
import  "lib/axiosInterceptors"
import GlobalFonts from 'static/fonts';
import { GlobalStyles } from "./global-styles"

export const App = () => (
    <ErrorBoundary>
        <Normalize />
        <GlobalStyles />
        <GlobalFonts />
        <AccountLoader>
            <Routes />
        </AccountLoader>
    </ErrorBoundary>
)