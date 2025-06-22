import { createSlice } from '@reduxjs/toolkit'
import { IInstructorInitialStateType } from './instructor.interface'
import { applyInstructor } from './instructor.action'

const initialState: IInstructorInitialStateType = {
	isLoading: false,
	error: null,
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
