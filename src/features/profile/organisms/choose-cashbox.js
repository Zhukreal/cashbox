import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { history } from 'lib/routing'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { apiCheckCashStatus } from 'api/account'
import { Button, ButtonIcon, CashBoxList } from 'ui'
import arrowRight from 'static/img/icons/arrow-right.png'

export const ChooseCashbox = () => {
  const { cashes, currentShift } = useSelector((state) => state.profile)
  const [activeCashbox, setActiveCashbox] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const currentDevice = useDetectDevice()

  useEffect(() => {
    apiCheckCashStatus()
      .then((res) => {
        const kassa = res.data
        if(kassa.cash) {
          localStorage.setItem('cashbox', kassa.cash)
          localStorage.setItem('store', kassa.store)
          // window.location.href = '/'
          history.push('/')
        }
        // setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
      })
  }, [])

  // useEffect(() => {
  //   console.log('currentShift', currentShift)
  //   if(currentShift.cash) {
  //     localStorage.setItem('cashbox', currentShift.cash)
  //     localStorage.setItem('store', currentShift.store)
  //     window.location.href = '/'
  //   }
  // }, [currentShift])


  // useEffect(() => {
  //   if(!isLoading) {
  //     if (cashes.length === 1) {
  //       localStorage.setItem('cashbox', cashes[0].id)
  //       localStorage.setItem('store', cashes[0].store_id)
  //       window.location.href = '/'
  //     }
  //   }
  // }, [cashes, isLoading])

  const handleChooseCashbox = () => {
    if (!activeCashbox.id) return
    localStorage.setItem('cashbox', activeCashbox.id)
    localStorage.setItem('store', activeCashbox.store_id)
    // window.location.href = '/'
    history.push('/')
  }

  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      <CashBoxList
        list={cashes}
        active={activeCashbox}
        setActive={setActiveCashbox}
      />
      <div>
        {isMobileView && (
          <EnterMobile>
            <EMText>Далее</EMText>
            <ButtonIcon
              onClick={handleChooseCashbox}
              disabled={!activeCashbox.id}
              icon={arrowRight}
            ></ButtonIcon>
          </EnterMobile>
        )}
        {isDesktopView && (
          <Button
            onClick={handleChooseCashbox}
            disabled={!activeCashbox.id}
            isLoading={false}
            isUpperCase
          >
            Далее
          </Button>
        )}
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
