import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {emailValidator, passwordValidator} from "lib/validators";
import {authActions} from 'features/auth'

import {CenterContentTemplate, CardTemplate, ControlContainerTemplate, Button, Input, H2} from "ui";


export const LoginPage = () => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector( state => state.profile )
    const { isLoading } = useSelector( state => state.auth )

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const isInvalidForm = Boolean(!data.email || !data.password || errors.email || errors.password)

    useEffect(() => {
        validateForm()
    }, [data])

    const validateForm = () => {
        setErrors({...errors,
            email: emailValidator(data.email),
            password: passwordValidator(data.password),
        })
    }

    const onChange = e => {
        const {name, value} = e.target
        setData({...data, [name]: value})
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        if(isInvalidForm) {
            validateForm()
            return
        }
        dispatch(authActions.login(data))
    }

    if (isAuth) return <Redirect to={"/"} />;
    return (
        <CenterContentTemplate>
            <CardTemplate>
                <H2>Welcome</H2>
                <form onSubmit={handleSubmitForm} >
                    <ControlContainerTemplate>
                        <Input
                            label='Email'
                            name='email'
                            value={data.email}
                            onChange={onChange}
                            placeholder='email'
                            error={data.email && errors.email}
                        />
                    </ControlContainerTemplate>

                    <ControlContainerTemplate>
                        <Input
                            label='Password'
                            name='password'
                            type='password'
                            value={data.password}
                            onChange={onChange}
                            placeholder='password'
                            error={data.password && errors.password}
                        />
                    </ControlContainerTemplate>

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isInvalidForm}
                    >
                        Login
                    </Button>

                </form>
            </CardTemplate>
        </CenterContentTemplate>
    )
}


