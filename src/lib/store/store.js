import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
// import { ThunkAction } from 'redux-thunk'

const middleware = getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
    thunk: true,
});

export const store = configureStore({
    reducer: rootReducer ,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

// export const AppThunk = ThunkAction;