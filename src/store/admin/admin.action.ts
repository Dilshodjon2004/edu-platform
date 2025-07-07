import { errorCatch } from '@/helpers/api.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	AdminDeleteCourseInterfaceResponse,
	AdminSearchUsersInterfaceResponse,
	AdminUserInterfaceResponse,
	ApproveAndDeleteInstructorBody,
} from './admin.interface'
import { AdminService } from '@/services/admin.service'
import { IUserType } from '@/interfaces/user.interface'
import { ICourseType } from '@/interfaces/course.interface'

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
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const searchAdminUsers = createAsyncThunk<
	IUserType[],
	AdminSearchUsersInterfaceResponse
>('admin/search-users', async (body, thunkApi) => {
	try {
		const response = await AdminService.searchUsers(body.query, body.limit)
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const deleteAdminCourse = createAsyncThunk<
	ICourseType[],
	AdminDeleteCourseInterfaceResponse
>('admin/delete-course', async (body, thunkApi) => {
	try {
		const response = await AdminService.deleteCourse(body.courseId)
		body.callback()
		return response
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})
