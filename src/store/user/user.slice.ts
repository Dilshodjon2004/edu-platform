import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmailAndPassword, IUserInitialStateType } from './user.interface'
import {
	checkAuth,
	editUserPassword,
	login,
	logout,
	register,
	sendVerificationCode,
	verifyVerificationCode,
} from './user.action'

const initialState: IUserInitialStateType = {
	user: null,
	isLoading: false,
	error: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		pendingRegister: (state, action: PayloadAction<IEmailAndPassword>) => {
			state.user = {
				email: action.payload.email,
				password: action.payload.password,
			}
		},
		clearError: state => {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.error = null
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.error = payload
			})
			.addCase(login.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.error = null
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.error = payload
			})
			.addCase(sendVerificationCode.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(sendVerificationCode.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(sendVerificationCode.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.error = payload
			})
			.addCase(verifyVerificationCode.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(verifyVerificationCode.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(verifyVerificationCode.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(editUserPassword.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(editUserPassword.fulfilled, state => {
				state.isLoading = false
				state.error = null
			})
			.addCase(editUserPassword.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	},
})

export const userReducers = userSlice.reducer
export const userSliceActions = userSlice.actions
