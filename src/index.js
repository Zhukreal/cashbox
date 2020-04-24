import * as React from "react"
import * as ReactDom from "react-dom"
import { Router } from "react-router-dom"
import { Provider } from 'react-redux'

import { history } from "./lib/routing"
import { App } from "./app"
import {store} from './lib/store/store'


const root = document.querySelector("#root")

const render = () => {
    if (root) {
        ReactDom.render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>,
            root,
        )
    }
}
render()


