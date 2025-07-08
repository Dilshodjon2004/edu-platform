import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBooksInitialStateType } from './books.interface'
import { createBooks, deleteBooks, updateBooks } from './books.action'
import { IBooksType } from '@/interfaces/books.interface'

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
		getBooks: (state, action: PayloadAction<IBooksType[]>) => {
			state.books = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createBooks.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createBooks.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.books = [...state.books, payload]
				state.error = null
			})
			.addCase(createBooks.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(deleteBooks.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(deleteBooks.fulfilled, (state, { payload }) => {
				state.isLoading = false
				const newArr = state.books.filter(c => c._id !== payload._id)
				state.books = newArr
				state.error = null
			})
			.addCase(deleteBooks.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(updateBooks.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(updateBooks.fulfilled, (state, { payload }) => {
				state.isLoading = false
				const newArr = state.books.map(item => {
					if (item._id === payload._id) {
						return payload
					}
					return item
				})
				state.books = newArr
				state.error = null
			})
			.addCase(updateBooks.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	},
})

export const booksReducers = booksSlice.reducer
export const booksSliceActions = booksSlice.actions
