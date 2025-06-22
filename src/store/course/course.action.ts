import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from '@/helpers/api.helper'
import { ICreateCourseBody } from './course.interface'
import { CourseService } from '@/services/course.service'

export const createCourse = createAsyncThunk<'success', ICreateCourseBody>(
	'course/create',
	async (body, thunkApi) => {
		try {
			const response = await CourseService.createCourse(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)
