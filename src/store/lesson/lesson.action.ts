import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILessonBodyType } from './lesson.interface'
import { LessonService } from '@/services/lesson.service'
import { errorCatch } from '@/helpers/api.helper'

export const createLesson = createAsyncThunk<'success', ILessonBodyType>(
	'lesson/create',
	async (body, thunkApi) => {
		try {
			const response = await LessonService.createLesson(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const deleteLesson = createAsyncThunk<'success', ILessonBodyType>(
	'lesson/delete',
	async (body, thunkApi) => {
		try {
			const response = await LessonService.deleteLesson(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const editLesson = createAsyncThunk<'success', ILessonBodyType>(
	'lesson/edit',
	async (body, thunkApi) => {
		try {
			const response = await LessonService.editLesson(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)
