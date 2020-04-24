import {createGlobalStyle, css} from "styled-components"

const colorVariables = css`
  --primary: #000000;
  --canvas: #eceff1;
  --canvas-text: rgba(14,37,74,1);
  --card: #ffffff;
  --blue: rgb(80, 135, 222)
`

export const GlobalStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
      
    }
    
    :root {
        font-size: 10px;
        ${colorVariables}
    }
    
    body {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        min-height: 100vh;
        margin: 0;
        background-color: var(--canvas);
        color: var(--canvas-text);
        font-family: "GilroyLight", sans-serif;
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



