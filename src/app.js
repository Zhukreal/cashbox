import React from 'react'
import { Normalize } from "styled-normalize"
import {NotificationContainer} from 'react-notifications';
import { Routes } from "./routes"
import { AccountLoader } from "features/profile"
import { CommonLoader } from "features/common"
import ErrorBoundary from "lib/ErrorBoundary"
import  "lib/axiosInterceptors"
import GlobalFonts from 'static/fonts';
import { GlobalStyles } from "./global-styles"
import 'lib/notification/styles.css'

export const App = () => (
    <ErrorBoundary>
        <Normalize />
        <GlobalStyles />
        <GlobalFonts />
        <AccountLoader>
            <CommonLoader>
                <Routes />
            </CommonLoader>
        </AccountLoader>
        <NotificationContainer />
    </ErrorBoundary>
)