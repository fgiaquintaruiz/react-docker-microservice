import { useMutation } from "@apollo/react-hooks";
import React from 'react';
import { useForm } from "react-hook-form";
import styled from "styled-components";
import TextInput from '../../../shared/TextInput';
import gql from "graphql-tag";
import * as yup from "yup";

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

const SignUpButton = styled.button`
    display: inline-block;
    font-size: .9rem;
    margin-button: .5rem;
`;

const OrLogin = styled.span`
    font-size: .9rem;
`;

const mutation = gql`
    mutation($email:String!, $password: String!){
        createUser(email: $email, password: $password){
            id
        }
    }
`;

const validationSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required().test("sameAsConfirmPassword", "${path} is not the same as the confirmation password", function () {
        return this.parent.password === this.parent.confirmPassword;
    })
})

const SignUp = ({ onChangeToLogin: pushChangeToLogin }) => {
    const [createUser] = useMutation(mutation);
    const {
        formState: { isSubmitting, isValid },
        handleSubmit,
        register,
        reset
    } = useForm({mode: "onChange", validationSchema});

    const onSubmit = handleSubmit(async ({ email, password }) => {
        await createUser({
            variables: {
                email,
                password
            }
        });
        reset();
        pushChangeToLogin();

    });

    return <form onSubmit={onSubmit}>
        <Label>
            <LabelText>Email</LabelText>
            <TextInput disabled={isSubmitting} name="email" type="email" ref={register}></TextInput>
            
            <LabelText>Password</LabelText>
            <TextInput disabled={isSubmitting} name="password" type="password" ref={register}></TextInput>

            <LabelText>Confirm Password</LabelText>
            <TextInput disabled={isSubmitting} name="confirmPassword" type="password" ref={register}></TextInput>

            <SignUpButton disabled={isSubmitting || !isValid} type="submit">Sign Up</SignUpButton>
            {" "}<OrLogin> or {" "}
                <a href="#" onClick={evt => {
                    evt.preventDefault();
                    pushChangeToLogin();
                }}>Login</a>
            </OrLogin>
        </Label>
    </form>;
}

export default SignUp;