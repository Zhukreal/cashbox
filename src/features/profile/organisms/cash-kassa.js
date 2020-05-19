import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileActions } from '../index'
import { Button, StyledButton, Prompt } from 'ui'
import { showNotification } from '../../../lib/notification'

export const CashKassa = ({
  type,
  title,
  onCancel,
  onSuccess,
  cancelText,
  okText,
  isLoading,
}) => {
  const [value, setValue] = useState('')
  const { isLoadingCashKassa } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const onChange = (e) => {
    const { value } = e.target
    const num = value.replace(/\D/g, '')
    setValue(num)
  }

  const handleCash = async () => {
    try {
      if (type === 1) {
        await dispatch(profileActions.addCashToKassa(value))
        showNotification('info', 'Успешно')
      } else {
        await dispatch(profileActions.removeCashFromKassa(value))
        showNotification('info', 'Успешно')
      }
      onSuccess()
    } catch (e) {}
  }

  return (
    <Prompt
      title={title}
      cash={'1 4949 тнг.'}
      onOk={handleCash}
      onCancel={onCancel}
      cancelText={cancelText}
      okText={okText}
      value={value}
      onChange={onChange}
      isLoading={isLoadingCashKassa}
    />
  )
}
