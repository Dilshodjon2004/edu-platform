import { createSlice } from '@reduxjs/toolkit'
import { ILessonInitialStateType } from './lesson.interface'
import { createLesson, deleteLesson, editLesson } from './lesson.action'

const initialState: ILessonInitialStateType = {
	isLoading: false,
	error: null,
}

export const lessonSlice = createSlice({
	name: 'lesson',
	initialState,
	reducers: {
		clearLessonError: state => {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createLesson.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createLesson.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(createLesson.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteLesson.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(deleteLesson.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(deleteLesson.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(editLesson.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(editLesson.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(editLesson.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	},
})

export const lessonReducers = lessonSlice.reducer
export const lessonSliceActions = lessonSlice.actions
