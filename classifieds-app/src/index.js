import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import { createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
}

body {
    font-family: Roboto, sans-serif;
}
`;

render(
    <>
    <GlobalStyle></GlobalStyle>
        <Root></Root>
        </>
    , document.getElementById("app"));



