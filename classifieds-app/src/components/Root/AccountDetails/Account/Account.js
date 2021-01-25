import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const Email = styled.div`
    color: ${props => props.theme.nero};
    font-size: 1rem;
    margin-top: .25rem;
`;

const Wrapper = styled.div`
    color: ${props => props.theme.mortar};
    font-size: .9rem;
`;

const Account = () => {
    const session = useSelector(state => state.session);
    return <Wrapper>Logged in as <Email>{session.user.email}</Email></Wrapper>;
};

export default Account;