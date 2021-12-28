import { combineReducers } from "@reduxjs/toolkit"
import calendarReducer from '../features/calendar/calendarSlice'

const injectedReducers = {
    calendar: calendarReducer
}

const rootReducer = combineReducers({
    ...injectedReducers,
})


export type RootState = ReturnType<typeof rootReducer>

export const createReducer = () => rootReducer