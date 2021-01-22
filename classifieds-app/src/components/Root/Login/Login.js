import React from 'react';
import useForm from "react-hook-form";
import styled from "styled-components";

const Label = styled.label`
    display: block;
    :not(:first-child){
        margin-top: .75rem;
    }
`;

const LabelText = styled.strong`
    display: block;
    font-size: .9rem;
    margin-top: .25rem;
    
`;

const Login = () => {
    const { 
        formState: { isSubmitting },
        handleSubmit, 
        register
    } = useForm();

    const onSubmit = handelSubmit(({ email, password }) => {
        console.log("form email:" + email + " pass: " + password);
    })
    return <form onSubmit={onSubmit}>
        <Label>
            <LabelText>Email</LabelText>
            asdasda
        </Label>
    </form>
}

export default Login