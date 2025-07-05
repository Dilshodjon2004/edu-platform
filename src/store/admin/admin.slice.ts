import { ICourseType } from '@/interfaces/course.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAdminInitialStateType } from './admin.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IUserType } from '@/interfaces/user.interface'

const initialState: IAdminInitialStateType = {
	isLoading: false,
	error: null,
	courses: [],
	instructors: [],
	users: [],
}

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		clearCourseError: state => {
			state.error = null
		},
		getCourses: (state, action: PayloadAction<ICourseType[]>) => {
			state.courses = action.payload
		},
		getInstructors: (state, action: PayloadAction<InstructorType[]>) => {
			state.instructors = action.payload
		},
		getUsers: (state, action: PayloadAction<IUserType[]>) => {
			state.users = action.payload
		},
	},
})

export const adminReducers = adminSlice.reducer
export const adminSliceActions = adminSlice.actions
