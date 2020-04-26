import React, {useState, useEffect} from "react"
import styled, {keyframes} from "styled-components"
import {Text, Button} from "ui"

export const InactiveForWhile = ({ handleContinueSession, handleLogout }) => {
    const [timer, setTimer] = useState(59)
    useEffect(() => {
        const timer2 = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer2)
    }, [])

    useEffect(() => {
        console.log(timer)
        if(timer <= 0) handleLogout()
    }, [timer])


    return (
        <>
            <Text fz={30} mb={30} >
                Вы бездействовали некоторое время. <br/>
                Сессия будет отключена через:
            </Text>

            <TimerBox>
                <TimeValue>00:{timer < 10 ? `0${timer}` : timer}</TimeValue>
                <SvgTime>
                    <CirclePlaceholder r="86" cx="90" cy="90" />
                    <CircleTime r="86" cx="90" cy="90" />
                </SvgTime>
            </TimerBox>

            <div>
                <Button
                    onClick={handleContinueSession}
                    color='green'
                >
                    Продолжить сессию
                </Button>
            </div>
        </>
    )
}


const TimerBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 30px auto 30px auto;
    height: 180px;
    width: 180px;
    text-align: center;
`
const TimeValue = styled.div`
    font-size: 28px;
`
const countdown = keyframes`
  from {
        stroke-dashoffset: 0;
    }
    to {
        stroke-dashoffset: 540px;
    }
`;
const SvgTime = styled.svg`
    position: absolute;
    top: 0;
    right: 0;
    width: 180px;
    height: 180px;
    transform: rotateY(-180deg) rotateZ(-90deg);
`
const CircleTime = styled.circle`
    stroke-dasharray: 540px;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke-width: 8px;
    stroke: var(--green);
    fill: none;
    animation: ${countdown} 59s linear infinite forwards;
    z-index: 3;
`
const CirclePlaceholder = styled.circle`
    stroke-dasharray: 540px;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke-width: 8px;
    stroke: #25d77e;
    opacity: 0.1;
    fill: none;
    z-index: 2;
`