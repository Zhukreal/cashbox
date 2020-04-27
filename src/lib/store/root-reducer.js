import { combineReducers } from '@reduxjs/toolkit'

import authReducer from 'features/auth/modules/reducer'
import profileReducer from 'features/profile/modules/reducer'
import productReducer from 'features/product/modules/reducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    product: productReducer
})

