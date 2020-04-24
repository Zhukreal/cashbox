import React from "react";

import {CenterContentTemplate, CardTemplate, FlexContainer} from "../../ui/templates"
// import {Button, Input, H2} from "../../ui/atoms";
// import {
//     createUser,
//     handleSubmitForm,
//     $data,
//     $onChange,
//     $errors
// } from "./model"

export const RegistrationPage = () => {
    // const isLoading = useStore(createUser.pending);
    // const data = useStore($data);
    // const errors = useStore($errors)
    //
    // const hSubmitForm = e => {
    //     e.preventDefault()
    //     handleSubmitForm($data.getState())
    // }

    return (
        <CenterContentTemplate>
            {/*<CardTemplate>*/}
            {/*    <H2>Registration</H2>*/}
            {/*    <form onSubmit={hSubmitForm}>*/}
            {/*        <Input*/}
            {/*            label='Email'*/}
            {/*            name='email'*/}
            {/*            value={data.email}*/}
            {/*            onChange={$onChange}*/}
            {/*            placeholder=''*/}
            {/*            error={data.email && errors.email}*/}
            {/*        />*/}
            {/*        <Input*/}
            {/*            label='Password'*/}
            {/*            name='password'*/}
            {/*            value={data.password}*/}
            {/*            onChange={$onChange}*/}
            {/*            placeholder=''*/}
            {/*            error={data.password && errors.password}*/}
            {/*        />*/}
            {/*        <FlexContainer center>*/}
            {/*            <Button type="submit" isloading={isLoading} >Submit</Button>*/}
            {/*        </FlexContainer>*/}
            {/*    </form>*/}
            {/*</CardTemplate>*/}
        </CenterContentTemplate>
    )
}


