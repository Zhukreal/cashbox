import {createGlobalStyle, css} from "styled-components"

const colorVariables = css`
  --primary: #000000;
  --canvas: #ffffff;
  --canvas-text: rgba(14,37,74,1);
  --card: #ffffff;
  --shadow-card: 0px 3px 6px rgba(0, 0, 0, 0.161);
  --blue: rgb(80, 135, 222);
  --blue-hover: rgb(81,129,217);
  --green: #25D77E;
  --green-hover: #25d279;
  --red: #F16F58;
  --red-hover: #ec6f58;
`

export const GlobalStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
      :focus {
            outline: none;
        }
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
        font-family: "Gilroy", sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    
    #root {
        min-height: 100vh;
        font-size: 10px;
    }
  
`



