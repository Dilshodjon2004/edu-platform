import { createAsyncThunk } from '@reduxjs/toolkit'
import { ISectionBodyType } from './section.interface'
import { SectionService } from '@/services/section.service'
import { errorCatch } from '@/helpers/api.helper'
import { SectionType } from '@/interfaces/instructor.interface'

export const createSection = createAsyncThunk<'success', ISectionBodyType>(
	'section/create',
	async (body, thunkApi) => {
		try {
			const response = await SectionService.createSection(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const deleteSection = createAsyncThunk<'success', ISectionBodyType>(
	'section/delete',
	async (body, thunkApi) => {
		try {
			const response = await SectionService.deleteSection(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const editSection = createAsyncThunk<'success', ISectionBodyType>(
	'section/edit',
	async (body, thunkApi) => {
		try {
			const response = await SectionService.editSection(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const getSection = createAsyncThunk<SectionType[], ISectionBodyType>(
	'section/get',
	async (body, thunkApi) => {
		try {
			const response = await SectionService.getSection(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const dragSection = createAsyncThunk<SectionType[], ISectionBodyType>(
	'section/drag',
	async (body, thunkApi) => {
		try {
			const response = await SectionService.dragSection(body)
			body.callback()
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)
