import gql from 'graphql-tag';
import React from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from "react-redux";
import TextInput from "#root/components/shared/TextInput";
import Textarea from "#root/components/shared/Textarea";


const Button = styled.button`
    display: inline-block;
    margin-button: .5rem;
`;

const Form = styled.form`
    background-color: ${props => props.theme.whitSmoke};
    margin-top: 1rem;
    padding: 1rem;
`;

const Label = styled.label`
    display: block;

    :not(:first-child){
        margin-top:.5rem;
    }
`;

const LabelText = styled.strong`
    display: block;
    font-size: .9rem;
    margin-bottom: .5rem;
`;

const mutation = gql`
    mutation($description: String!, $title: String!){
        createListing(description: $description, title: $title){
            id
        }
    }
`;



const AddListing = ({ onAddListing: pushAddListing}) => {
    const [createListing] = useMutation(mutation); 
    const { 
        formState: { isSubmitting },
        handleSubmit,
        register,
        reset
    } = useForm();

    const session = useSelector(state => state.session);

    if(!session) return <p>Login to add listing.</p>

    const onSubmit = handleSubmit(async ({ description, title }) => {
        console.log(description, title);
        await createListing({
            variables: {
                description,
                title
            }
        });
        reset();
        pushAddListing();
    })
    return (
        <Form onSubmit={onSubmit}>
            <Label>
                <LabelText>Title</LabelText>
                <TextInput disabled={isSubmitting} name="title" type="text" ref={register}></TextInput>
            </Label>
            <Label>
                <LabelText>Description</LabelText>
                <Textarea disabled={isSubmitting} name="description" ref={register}></Textarea>
            </Label>
            <Button disabled={isSubmitting} type="submit">Add Listing</Button>
        </Form>
    );
};

export default AddListing;