import React, { useState, useEffect, useRef } from "react";
import {Button, Text, Modal} from "ui";

export const TestPage = () => {
    const [opened, setOpened] = useState(false)
    const close = () => setOpened(() => false)
    const toggle = () => setOpened((isOpen) => !isOpen)


    function partial(func, ...argsBound) {
        return function(...args) {
            return func.call(this, ...argsBound, ...args);
        }
    }
    let user = {
        firstName: "John",
        say(time, phrase) {
            console.log(`[${time}] ${this.firstName}: ${phrase}!`);
        }
    };
    user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());
    user.sayNow("Hello");

    return (
        <div>
            <Button
                onClick={toggle}
            >
                openModal
            </Button>

            {opened && (
                <Modal onClose={close} >
                    <Text fz={16}>Сессия была отключена так как вы бездействовали некоторое время</Text>
                    <div>
                        <Button
                            onClick={toggle}
                            size='small'

                        >
                            Продолжить сессию
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    )

}


