import { errorCatch } from '@/helpers/api.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	AdminUserInterfaceResponse,
	ApproveAndDeleteInstructorBody,
} from './admin.interface'
import { AdminService } from '@/services/admin.service'
import { IUserType } from '@/interfaces/user.interface'

export const approveInstructor = createAsyncThunk<
	'success',
	ApproveAndDeleteInstructorBody
>('admin/approve-instructor', async (body, thunkApi) => {
	try {
		const response = await AdminService.approveInstructor(body.instructorId)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const deleteInstructor = createAsyncThunk<
	'success',
	ApproveAndDeleteInstructorBody
>('admin/delete-instructor', async (body, thunkApi) => {
	try {
		const response = await AdminService.deleteInstructor(body.instructorId)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const moreAdminUsers = createAsyncThunk<
	IUserType[],
	AdminUserInterfaceResponse
>('admin/all-users', async (body, thunkApi) => {
	try {
		const response = await AdminService.getUsers(body.limit, body.token)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})
