import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
import courseReducer from '../slices/courseSlice'
import viewReducer from '../slices/viewCourseSlice'
import sidebarReducer from '../slices/sidebarSlice'

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    sidebar:sidebarReducer,
    viewCourse:viewReducer,
})
export default rootReducer;