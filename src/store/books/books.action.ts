import { errorCatch } from '@/helpers/api.helper'
import { IBooksType } from '@/interfaces/books.interface'
import { BooksService } from '@/services/books.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BooksActionBody } from './books.interface'

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
