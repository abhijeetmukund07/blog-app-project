import {configureStore} from '@reduxjs/toolkit'
import userLoginReducer from './userLoginSlice'
export const reduxStore = configureStore({
    reducer:{
        userLogin : userLoginReducer
    }
})