import { createSlice } from '@reduxjs/toolkit'
import { IBooksInitialStateType } from './books.interface'
import { createBooks } from './books.action'

const initialState: IBooksInitialStateType = {
	isLoading: false,
	error: null,
	books: [],
}

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		clearBooksError: state => {
			state.error = null
		},
		startCreateBooksLoading: state => {
			state.isLoading = true
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createBooks.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createBooks.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(createBooks.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	},
})

export const booksReducers = booksSlice.reducer
export const booksSliceActions = booksSlice.actions
