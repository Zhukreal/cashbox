import React, { useRef } from "react"
import styled from "styled-components"
import useOnClickOutside from "use-onclickoutside"

export const Modal = ({ children, onClose }) => {
    const ref = useRef(null)
    useOnClickOutside(ref, onClose)

    return (
        <ModalBox ref={ref} >
            {children}
        </ModalBox>
    )
}

const ModalBox = styled.div`
    position:fixed;
    background: white;
    width: 50%;
    padding: 3rem;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 30px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.161);
`

