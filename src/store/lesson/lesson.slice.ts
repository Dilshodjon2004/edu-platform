import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILessonInitialStateType } from './lesson.interface'
import { LessonType } from '@/interfaces/instructor.interface'

const initialState: ILessonInitialStateType = {
	isLoading: false,
	error: null,
	lesson: {} as LessonType,
}

export const lessonSlice = createSlice({
	name: 'lesson',
	initialState,
	reducers: {
		clearLessonError: state => {
			state.error = null
		},
		getLesson: (state, action: PayloadAction<LessonType>) => {
			state.lesson = action.payload
		},
	},
	extraReducers: builder => {
		builder
	},
})

export const lessonReducers = lessonSlice.reducer
export const lessonSliceActions = lessonSlice.actions
