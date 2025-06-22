import { createSlice } from '@reduxjs/toolkit'
import { ICourseInitialStateType } from './course.interface'
import { createCourse } from './course.action'

const initialState: ICourseInitialStateType = {
	isLoading: false,
	error: null,
}

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		clearCourseError: state => {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createCourse.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createCourse.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(createCourse.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	},
})

export const courseReducers = courseSlice.reducer
export const courseSliceActions = courseSlice.actions
