import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInstructorInitialStateType } from './instructor.interface'
import { applyInstructor } from './instructor.action'
import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'

const initialState: IInstructorInitialStateType = {
	isLoading: false,
	error: null,
	courses: [],
	course: null,
	instructors: [],
}

export const instructorSlice = createSlice({
	name: 'instructor',
	initialState,
	reducers: {
		startLoading: state => {
			state.isLoading = true
		},
		clearInstructorError: state => {
			state.error = null
		},
		instructorAllCourses: (state, action: PayloadAction<ICourseType[]>) => {
			state.courses = action.payload
		},
		instructorDetailedCourse: (state, action: PayloadAction<ICourseType>) => {
			state.course = action.payload
		},
		getInstructors: (state, action: PayloadAction<InstructorType[]>) => {
			state.instructors = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(applyInstructor.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(applyInstructor.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(applyInstructor.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	},
})

export const instructorReducers = instructorSlice.reducer
export const instructorSliceActions = instructorSlice.actions
