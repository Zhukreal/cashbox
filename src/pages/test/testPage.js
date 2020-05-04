import React from "react";
import test from 'static/img/logo.png'

export const TestPage = () => {
    const obj = {
        'test': test
    }

    const getLogo = () => {
        // your logic
        return obj['test']
    }

    return (
        <>
            <img src={getLogo()} alt="t"/>
        </>
    )
}


