import { createGlobalStyle } from "styled-components"
import { staticLight } from "ui/themes/light"
import { staticDark } from "ui/themes/dark"

export const GlobalStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
    }
    
    :root {
        font-size: 10px;
    }
    
    [data-theme="dark"] {
        ${staticDark}
     }

    [data-theme="light"] {
        ${staticLight}
    }
    
    body {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        min-height: 100vh;
        margin: 0;
        background-color: var(--canvas);
        color: var(--canvas-text);
        font-family: "Alegreya Sans", "Open Sans", sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    
    #root {
        min-height: 100vh;
        font-size: 10px;
    }
    
    tt,
    code,
    kbd,
    samp,
    listing {
        font-family: hasklig, Hack, "Fira Code", "Source Code Pro", monaco, menlo,
          consolas, monospace;
        font-variant-ligatures: contextual;
    }
`
