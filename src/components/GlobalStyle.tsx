"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #f2f2f2;
        color: black;
        font-family: Arial, Helvetica, sans-serif;
    }
`;

export default GlobalStyle;
