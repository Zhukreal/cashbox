import React, { useState, useEffect, useRef } from "react";
import {Button, Text, Modal} from "ui";

export const TestPage = () => {
    const [opened, setOpened] = useState(false)
    const close = () => setOpened(() => false)
    const toggle = () => setOpened((isOpen) => !isOpen)

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


