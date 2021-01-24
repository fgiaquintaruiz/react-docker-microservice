import React from 'react';
import styled from "styled-components";
import Login from './Login';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin: 0 auto;
    width: 80rem;
`;

const Content = styled.div`
    flex: 1;
    margin-right: 1rem;
`;

const Sidebar = styled.div`
    flex: 0 auto;
    width: 10rem;
`;
const Wrapper = styled.div`
    box-sizing: border-box;
    height: 100%;
    padding: 1rem;
    width: 100%;
`;

const Root = () => {
    // return <h1>hola</h1>
    return <Wrapper>
         <Container>
            <Content>Root classifieds app</Content>
            <Sidebar>
                <Login></Login>
                
            </Sidebar>
        </Container >
        
    </Wrapper>
}
 
export default Root;