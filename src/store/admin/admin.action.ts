import { errorCatch } from '@/helpers/api.helper'
import { CourseService } from '@/services/course.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IById, ICreateCourseBody } from './admin.interface'

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

export const editCourse = createAsyncThunk<'success', ICreateCourseBody>(
	'course/edit',
	async (body, thunkApi) => {
		try {
			const response = await CourseService.editCourse(body, body._id)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const deleteCourse = createAsyncThunk<'success', IById>(
	'course/delete',
	async (body, thunkApi) => {
		try {
			const response = await CourseService.deleteCourse(body.courseId)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const activateCourse = createAsyncThunk<'success', IById>(
	'course/activate',
	async (body, thunkApi) => {
		try {
			const response = await CourseService.activateCourse(body.courseId)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const draftCourse = createAsyncThunk<'success', IById>(
	'course/draft',
	async (body, thunkApi) => {
		try {
			const response = await CourseService.draftCourse(body.courseId)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)
