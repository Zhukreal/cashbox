import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {history} from "lib/routing";
import {useDetectDevice} from "lib/mediaDevice";
import {Button, ButtonIcon, CashBoxList} from "ui";
import arrowRight from 'static/img/icons/arrow-right.png'



export const ChooseCashbox = () => {
    const { cashes } = useSelector( state => state.profile )
    const [activeCashbox, setActiveCashbox] = useState({})
    const currentDevice = useDetectDevice()

    useEffect(() => {
        if(cashes.length === 1) {
            localStorage.setItem('cashbox', cashes[0].id)
            localStorage.setItem('store', cashes[0].store_id)
            history.push('/')
        }
    }, [cashes])

    const handleChooseCashbox = () => {
        if(!activeCashbox.id) return
        localStorage.setItem('cashbox', activeCashbox.id)
        localStorage.setItem('store', activeCashbox.store_id)
        history.push('/')
    }

    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

    return (
        <>
            <CashBoxList
                list={cashes}
                active={activeCashbox}
                setActive={setActiveCashbox}
            />
            <div>
                {isMobileView &&
                <EnterMobile>
                    <EMText>Далее</EMText>
                    <ButtonIcon
                        onClick={handleChooseCashbox}
                        disabled={!activeCashbox}
                        icon={arrowRight}
                    >
                    </ButtonIcon>
                </EnterMobile>
                }
                {isDesktopView &&
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
