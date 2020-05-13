import React, { useRef } from "react"
import styled from "styled-components"
import useOnClickOutside from "use-onclickoutside"
import { device } from 'lib/mediaDevice';

export const Modal = ({ children, onClose, noPadding }) => {
    const ref = useRef(null)
    useOnClickOutside(ref, onClose)

    return (
            <ModalBox ref={ref} noPadding={noPadding} >
                {children}
            </ModalBox>
    )
}

// const Overlay = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rebeccapurple;
//     z-index: 1000;
// `

const ModalBox = styled.div`
    position:fixed;
    background: white;
    //width: 50%;
    max-width: 750px;
    padding: ${p => p.noPadding ? 0 : '30px'};
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 30px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.161);
    z-index: 1001;
    
    @media ${device.mobile} {
      width: 90%;
    }
`

