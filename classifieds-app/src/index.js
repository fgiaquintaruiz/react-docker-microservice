import "@babel/polyfill";
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import * as theme from "./theme";
import { ApolloProvider } from "@apollo/react-hooks";
import graphqlClient from '#root/api/graphqlClient';

import store from './store';
import { Provider } from "react-redux";

const GlobalStyle = createGlobalStyle`

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
    <Provider store={store}>
        <ApolloProvider client={graphqlClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle></GlobalStyle>
                <Root></Root>
            </ThemeProvider>
        </ApolloProvider>
   </Provider>
    , document.getElementById("app"));



