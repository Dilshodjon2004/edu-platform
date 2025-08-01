import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICourseInitialStateType } from './course.interface'
import {
	activateCourse,
	createCourse,
	deleteCourse,
	draftCourse,
	editCourse,
} from './course.action'
import { ICourseType } from '@/interfaces/course.interface'

const initialState: ICourseInitialStateType = {
	isLoading: false,
	error: null,
	course: null,
	courses: [],
}

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		clearCourseError: state => {
			state.error = null
		},
		getCourses: (state, action: PayloadAction<ICourseType[]>) => {
			state.courses = action.payload
		},
		getCourse: (state, action: PayloadAction<ICourseType>) => {
			state.course = action.payload
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
			.addCase(editCourse.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(editCourse.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(editCourse.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteCourse.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(deleteCourse.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(deleteCourse.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(activateCourse.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(activateCourse.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(activateCourse.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(draftCourse.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(draftCourse.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(draftCourse.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	},
})

export const courseReducers = courseSlice.reducer
export const courseSliceActions = courseSlice.actions
