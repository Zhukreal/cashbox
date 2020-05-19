import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useIdle } from 'lib/customHooks/useIdle'
import { apiCheckConnection } from 'api/account'
import { AUTHTOKEN } from 'lib/CONST'
import { history } from 'lib/routing'
import { authActions } from 'features/auth'
import { productActions } from 'features/product'
import { profileActions } from 'features/profile'
import { CommonContentTemplate } from '../templates'
import { Text, Button, Modal, InactiveForWhile } from 'ui'

export const Common = ({ children }) => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)

  const handleWarn = () => {
    setOpened(true)
  }
  const handleLogout = () => {
    dispatch(authActions.setExpiredSession(true))
    dispatch(authActions.logout())
  }

  // useIdle(handleWarn, handleLogout)
  const handleContinueSession = () => {
    setOpened(false)
  }

  return (
    <CommonContentTemplate>
      {children}

      {opened && (
        <Modal>
          <InactiveForWhile
            handleContinueSession={handleContinueSession}
            handleLogout={handleLogout}
          />
        </Modal>
      )}
    </CommonContentTemplate>
  )
}
