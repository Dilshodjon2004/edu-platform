import { errorCatch } from '@/helpers/api.helper'
import { IBooksType } from '@/interfaces/books.interface'
import { BooksService } from '@/services/books.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BooksActionBody, DeleteBooksBody } from './books.interface'

export const createBooks = createAsyncThunk<IBooksType, BooksActionBody>(
	'books/create',
	async (body, thunkApi) => {
		try {
			const response = await BooksService.create(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const deleteBooks = createAsyncThunk<IBooksType, DeleteBooksBody>(
	'books/delete',
	async (body, thunkApi) => {
		try {
			const response = await BooksService.delete(body.booksId)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const updateBooks = createAsyncThunk<IBooksType, BooksActionBody>(
	'books/update',
	async (body, thunkApi) => {
		try {
			const response = await BooksService.update(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)
