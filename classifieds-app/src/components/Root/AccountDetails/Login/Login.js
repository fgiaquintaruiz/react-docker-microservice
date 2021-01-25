import { useMutation } from "@apollo/react-hooks";
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TextInput from '#root/components/shared/TextInput';
import gql from "graphql-tag";
import { setSession } from "#root/store/ducks/session";

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

const LoginButton = styled.button`
    display: inline-block;
    font-size: .9rem;
    margin-button: .5rem;
`;

const OrSignUp = styled.span`
    font-size: .9rem;
`;

const mutation = gql`
    mutation($email:String!, $password: String!){
        createUserSession(email: $email, password: $password){
            id
            user {
                email,
                id                
            }
        }
    }
`;

const Login = ({ onChangeToSignUp: pushChangeToSignUp }) => {
    const [createUserSession] = useMutation(mutation);
    const dispatch = useDispatch();
    const {
        formState: { isSubmitting },
        handleSubmit,
        register
    } = useForm();

    const onSubmit = handleSubmit(async ({ email, password }) => {
        const {
            data: {
                createUserSession: createdSession

            }
        } = await createUserSession({
            variables: {
                email,
                password
            }
        });

        dispatch(setSession(createdSession));

    });

    return <form onSubmit={onSubmit}>
        <Label>
            <LabelText>Email</LabelText>
            <TextInput disabled={isSubmitting} name="email" type="email" ref={register}></TextInput>
            <LabelText>Password</LabelText>
            <TextInput disabled={isSubmitting} name="password" type="password" ref={register}></TextInput>
            <LoginButton disabled={isSubmitting} type="submit">Login</LoginButton>
            {" "}<OrSignUp> or {" "}
                <a href="#" onClick={evt => {
                evt.preventDefault();
                pushChangeToSignUp();
                }}>Sign Up</a>
            </OrSignUp>
        </Label>
    </form>;
}

export default Login;