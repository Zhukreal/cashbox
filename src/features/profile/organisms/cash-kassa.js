import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { profileActions } from '../index'
import { Prompt } from 'ui'

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
  const { isLoadingCashKassa, currentShift, currency } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const onChange = (e) => {
    const { value } = e.target
    const num = value.replace(/\D/g, '')
    setValue(num)
  }

  const handleCash = async () => {
    try {
      const CASHBOX = localStorage.getItem('cashbox')
      let data = {
        sum: value,
        cash: CASHBOX,
        request_id: uuidv4(),
        currency: currency
      }
      if (type === 1) {
        await dispatch(profileActions.addCashToKassa(data))
      } else {
        await dispatch(profileActions.removeCashFromKassa(data))
      }
      onSuccess()
    } catch (e) {}
  }

  return (
    <Prompt
      title={title}
      cash={`${currentShift.total_sum} ${currency}`}
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
