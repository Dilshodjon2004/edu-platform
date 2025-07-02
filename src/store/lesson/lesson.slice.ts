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
	},
})

export const lessonReducers = lessonSlice.reducer
export const lessonSliceActions = lessonSlice.actions
