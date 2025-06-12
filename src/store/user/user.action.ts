import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthUserResponse } from './user.interface'
import { AuthService } from '@/services/auth.service'
import { errorCatch } from '@/helpers/api.helper'

export const register = createAsyncThunk<
	IAuthUserResponse,
	{ email: string; password: string; callback: () => void }
>('auth/register', async ({ email, password, callback }, thunkApi) => {
	try {
		const response = await AuthService.register(email, password)
		callback()
		return response.data
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const login = createAsyncThunk<
	IAuthUserResponse,
	{ email: string; password: string; callback: () => void }
>('auth/login', async ({ email, password, callback }, thunkApi) => {
	try {
		const response = await AuthService.login(email, password)
		callback()
		return response.data
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const sendVerificationCode = createAsyncThunk<
	'success',
	{ email: string; isUser: boolean; callback: () => void }
>(
	'auth/send-verification-code',
	async ({ email, isUser, callback }, thunkApi) => {
		try {
			const response = await AuthService.sendOtp(email, isUser)
			callback()
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const verifyVerificationCode = createAsyncThunk<
	'success',
	{ email: string; otpVerification: string; callback: () => void }
>(
	'auth/verify-verification-code',
	async ({ email, otpVerification, callback }, thunkApi) => {
		try {
			const response = await AuthService.verifyOtp(email, otpVerification)
			callback()
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const editUserPassword = createAsyncThunk<
	'success',
	{ email: string; password: string; callback: () => void }
>('auth/edit-user', async ({ email, password, callback }, thunkApi) => {
	try {
		const response = await AuthService.editUserPassword(email, password)
		callback()
		return response.data
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const logout = createAsyncThunk('auth/logout', () => {
	AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthUserResponse>(
	'auth/access',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)
