import { combineReducers } from '@reduxjs/toolkit'

import commonReducer from 'features/common/modules/reducer'
import authReducer from 'features/auth/modules/reducer'
import profileReducer from 'features/profile/modules/reducer'
import productReducer from 'features/product/modules/reducer'
import userReducer from 'features/user/modules/reducer'

export const rootReducer = combineReducers({
    common: commonReducer,
    auth: authReducer,
    profile: profileReducer,
    product: productReducer,
    user: userReducer
})

