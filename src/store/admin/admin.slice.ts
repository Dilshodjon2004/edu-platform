import { ICourseType } from '@/interfaces/course.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAdminInitialStateType } from './admin.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IUserType } from '@/interfaces/user.interface'
import {
	approveInstructor,
	deleteInstructor,
	moreAdminUsers,
} from './admin.action'

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
		clearAdminError: state => {
			state.error = null
		},
		getAdminCourses: (state, action: PayloadAction<ICourseType[]>) => {
			state.courses = action.payload
		},
		getAdminInstructors: (state, action: PayloadAction<InstructorType[]>) => {
			state.instructors = action.payload
		},
		getAdminUsers: (state, action: PayloadAction<IUserType[]>) => {
			state.users = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(approveInstructor.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(approveInstructor.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(approveInstructor.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteInstructor.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(deleteInstructor.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(deleteInstructor.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(moreAdminUsers.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(moreAdminUsers.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.error = null
				state.users = payload
			})
			.addCase(moreAdminUsers.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	},
})

export const adminReducers = adminSlice.reducer
export const adminSliceActions = adminSlice.actions
