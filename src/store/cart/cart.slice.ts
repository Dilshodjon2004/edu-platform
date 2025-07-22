import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartInitialState } from './cart.interface'
import { IBooksType } from '@/interfaces/books.interface'
import { ICourseType } from '@/interfaces/course.interface'
import { ProductsType } from '@/interfaces/constants.interface'

const initialState: ICartInitialState = {
	books: [],
	courses: [],
	product: {} as ProductsType,
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addBookToCart: (state, { payload }: PayloadAction<IBooksType>) => {
			state.books = [...state.books, payload]
		},
		addCourseToCart: (state, { payload }: PayloadAction<ICourseType>) => {
			state.courses = [...state.courses, payload]
		},
		editCourseCart: (state, { payload }: PayloadAction<ICourseType[]>) => {
			state.courses = payload
		},
		addProductToCart: (state, { payload }: PayloadAction<ProductsType>) => {
			state.product = payload
		},
		removeBookFromCart: (state, { payload }: PayloadAction<string>) => {
			const newArr = state.books.filter(c => c._id !== payload)
			state.books = newArr
		},
		removeCourseFromCart: (state, { payload }: PayloadAction<string>) => {
			const newArr = state.courses.filter(c => c._id !== payload)
			state.courses = newArr
		},
	},
})

export const cartReducers = cartSlice.reducer
export const cartSliceActions = cartSlice.actions
