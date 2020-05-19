import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileActions } from '../index'
import { Info } from 'ui'
import { showNotification } from '../../../lib/notification'

export const InfoKassa = ({ onCancel }) => {
  const { isLoadingInfoKassa, infoKassa } = useSelector(
    (state) => state.profile,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileActions.getKassaInfo())
  }, [])

  return (
    <Info data={infoKassa} onCancel={onCancel} isLoading={isLoadingInfoKassa} />
  )
}
