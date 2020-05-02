import React, { useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom'
import {Button, Text, Modal} from "ui";

export const TestPage = () => {
    const [opened, setOpened] = useState(1)
    const toggle = () => setOpened(5)

    useEffect(() => {
        return () => {
            console.log("cleaned up", opened);
        };
    }, []);

    console.log('opened', opened)


    return (
        <div>
            <Button
                onClick={toggle}
            >
                Test
            </Button>

            <Link to={'/'}>LInk</Link>

        </div>
    )

}


