import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	IAuthUserResponse,
	IEmailAndOtp,
	IEmailAndPassword,
} from './user.interface'
import { AuthService } from '@/services/auth.service'
import { errorCatch } from '@/helpers/api.helper'

export const register = createAsyncThunk<IAuthUserResponse, IEmailAndPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password)
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const login = createAsyncThunk<IAuthUserResponse, IEmailAndPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password)
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

export const sendVerificationCode = createAsyncThunk<
	'success',
	{ email: string }
>('auth/send-verification-code', async ({ email }, thunkApi) => {
	try {
		const response = await AuthService.sendOtp(email)
		return response.data
	} catch (error) {
		return thunkApi.rejectWithValue(errorCatch(error))
	}
})

export const verifyVerificationCode = createAsyncThunk<'success', IEmailAndOtp>(
	'auth/verify-verification-code',
	async ({ email, otpVerification }, thunkApi) => {
		try {
			const response = await AuthService.verifyOtp(email, otpVerification)
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(errorCatch(error))
		}
	}
)

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
