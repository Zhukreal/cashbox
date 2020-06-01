import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {formatDate} from 'lib/modifyData/formatDate'
import { profileActions } from '../index'
import { Info } from 'ui'
import { showNotification } from '../../../lib/notification'
import { getOfdStatus } from "../../product";

export const InfoKassa = ({ onCancel }) => {
  const { currentShift, currency } = useSelector((state) => state.profile)
  const [status, color] = getOfdStatus(currentShift.ofd_status)

  const data = {...currentShift,
    currency: currency,
    openDate: formatDate(currentShift.open_date, true),
    status: status,
    color: color
  }

  return (
    <Info
      data={data}
      onCancel={onCancel}
      // isLoading={isLoadingInfoKassa}
    />
  )
}
