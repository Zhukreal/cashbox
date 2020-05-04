import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {history} from "lib/routing";
import {useDetectDevice} from "lib/mediaDevice";
import {Button, CashBoxList} from "ui";




export const ChooseCashbox = () => {
    const { cashes } = useSelector( state => state.profile )
    const [activeCashbox, setActiveCashbox] = useState(null)
    const currentDevice = useDetectDevice()

    useEffect(() => {
        if(cashes.length === 1) {
            localStorage.setItem('cashbox', cashes[0].store_id)
            history.push('/')
        }
    }, [cashes])

    const handleChooseCashbox = () => {
        if(!activeCashbox) return
        localStorage.setItem('cashbox', activeCashbox)
        history.push('/')
    }

    return (
        <>
            <CashBoxList
                list={cashes}
                active={activeCashbox}
                setActive={setActiveCashbox}
            />
            <div>
                {(currentDevice.isMobile || currentDevice.isTablet) ?
                    <EnterMobile>
                        <EMText>Далее</EMText>
                        <EMButton onClick={handleChooseCashbox} disabled={!activeCashbox} >
                            <Arrow viewBox="5077.896 -1096 14.313 8.809">
                                <path fill="transparent" stroke="rgba(255,255,255,1)" stroke-width="2px"
                                      stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4"
                                      shape-rendering="auto" id="Path_336"
                                      d="M 5077.896484375 -1096.00048828125 L 5085.0537109375 -1087.19189453125 L 5092.2099609375 -1096.00048828125">
                                </path>
                            </Arrow>
                        </EMButton>
                    </EnterMobile>
                    :
                    <Button
                        onClick={handleChooseCashbox}
                        disabled={!activeCashbox}
                        isLoading={false}
                        isUpperCase
                    >
                        Далее
                    </Button>
                }
            </div>
        </>
    )
}

const EnterMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const EMText = styled.div`
    font-family: GilroyBold;
    font-size: 25px;
    color: var(--blue);
`
const EMButton = styled.button`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: #ffffff;
    background-color: var(--blue);
    box-shadow: var(--shadow-card);
    outline: none;
    border: none;
    font-size: 20px;
    
    :disabled {
      opacity: 0.7;
    }
`
const Arrow = styled.svg`
    width: 18px;
    height: 10px;
    transform: rotate(-90deg);
    /* transform-origin: center; */
    left: 2px;
    top: 0px;
    position: absolute;
    top: 19px;
    left: 18px;
`
