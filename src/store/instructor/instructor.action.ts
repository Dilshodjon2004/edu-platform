import { createAsyncThunk } from '@reduxjs/toolkit'
import { IInstructorApplyBody } from './instructor.interface'
import { errorCatch } from '@/helpers/api.helper'
import { InstructorService } from '@/services/instructor.service'

export const applyInstructor = createAsyncThunk<
	'success',
	IInstructorApplyBody
>('instructor/apply', async (body, thunkApi) => {
	try {
		const response = await InstructorService.applyInstructor(body)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})
