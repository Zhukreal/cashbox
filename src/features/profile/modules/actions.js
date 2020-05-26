import {
  apiGetAccount,
  apiCloseShift,
  apiLoadCurrentReport,
  apiCloseLastProcedure,
  apiCheckCashStatus,
  apiAddCashToKassa,
  apiRemoveCashFromKassa,
  apiGetInfoKassa,
} from 'api/account'
import { profileReducer } from 'features/profile'
import { showNotification } from 'lib/notification'

export const getAccount = (token) => async (dispatch) => {
  try {
    let profile = await apiGetAccount(token)
    dispatch(profileReducer.setProfile(profile.data))
  } catch (e) {
    console.log(e)
  }
}

export const checkCashStatus = () => async (dispatch) => {
  try {
    // const CASHBOX = localStorage.getItem('cashbox')
    let res = await apiCheckCashStatus()
    dispatch(profileReducer.setCashStatus(res.data))
  } catch (e) {
    console.log(e)
    showNotification('error', e)
  } finally {
  }
}

export const closeShift = () => async (dispatch) => {
  try {
    dispatch(profileReducer.setIsLoadingCloseShift(true))
    let res = await apiCloseShift()
  } catch (e) {
    showNotification('error', e)
    throw new Error(e)
  } finally {
    dispatch(profileReducer.setIsLoadingCloseShift(false))
  }
}

export const loadCurrentReport = () => async (dispatch) => {
  try {
    dispatch(profileReducer.setIsLoadingReport(true))
    const cashId = localStorage.getItem('cashbox')
    let res = await apiLoadCurrentReport(cashId)
    dispatch(profileReducer.setCurrentReport(res.data))
  } catch (e) {
    console.log(e)
    throw new Error(e)
  } finally {
    dispatch(profileReducer.setIsLoadingReport(false))
  }
}
export const closeLastProcedure = () => async (dispatch) => {
  try {
    dispatch(profileReducer.setIsLoadingCloseShift(true))
    let res = await apiCloseLastProcedure()
  } catch (e) {
    showNotification('error', e)
    throw new Error(e)
  } finally {
    dispatch(profileReducer.setIsLoadingCloseShift(false))
  }
}
export const addCashToKassa = () => async (dispatch) => {
  try {
    dispatch(profileReducer.setIsLoadingCashKassa(true))
    await apiAddCashToKassa()
  } catch (e) {
    showNotification('error', e)
    throw new Error(e)
  } finally {
    dispatch(profileReducer.setIsLoadingCashKassa(false))
  }
}
export const removeCashFromKassa = () => async (dispatch) => {
  try {
    dispatch(profileReducer.setIsLoadingCashKassa(true))
    await apiRemoveCashFromKassa()
  } catch (e) {
    showNotification('error', e)
    throw new Error(e)
  } finally {
    dispatch(profileReducer.setIsLoadingCashKassa(false))
  }
}
export const getKassaInfo = () => async (dispatch) => {
  try {
    const CASHBOX = localStorage.getItem('cashbox')
    dispatch(profileReducer.setIsLoadingInfoKassa(true))
    const res = await apiGetInfoKassa(CASHBOX)
    dispatch(profileReducer.setInfoKassa(res.data))
  } catch (e) {
    showNotification('error', e)
  } finally {
    // dispatch(profileReducer.setIsLoadingInfoKassa(false))
  }
}
