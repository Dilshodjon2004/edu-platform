import  $axios  from '@/api/axios'
import { getAuthUrl, getMailUrl, getUserUrl } from '@/config/api.config'
import { removeTokensCookie, saveTokensCookie } from '@/helpers/auth.helper'
import { IAuthUserResponse } from '@/store/user/user.interface'
import Cookies from 'js-cookie'

export const AuthService = {
	async register(email: string, password: string) {
		const response = await $axios.post<IAuthUserResponse>(
			`${getAuthUrl('register')}`,
			{
				email,
				password,
			}
		)

		if (response.data.accessToken) {
			saveTokensCookie(response.data)
		}

		return response
	},

	async login(email: string, password: string) {
		const response = await $axios.post<IAuthUserResponse>(
			`${getAuthUrl('login')}`,
			{
				email,
				password,
			}
		)

		if (response.data.accessToken) {
			saveTokensCookie(response.data)
		}

		return response
	},

	async sendOtp(email: string, isUser: boolean) {
		const response = await $axios.post<'success'>(`${getMailUrl('send-otp')}`, {
			email,
			isUser,
		})

		return response
	},

	async verifyOtp(email: string, otpVerification: string) {
		const response = await $axios.post<'success'>(
			`${getMailUrl('verify-otp')}`,
			{ email, otpVerification }
		)

		return response
	},

	async editUserPassword(email: string, password: string) {
		const response = await $axios.put<'success'>(
			`${getUserUrl('edit-password')}`,
			{ email, password }
		)

		return response
	},

	async checkUser(email: string) {
		const response = await $axios.post<'user' | 'not-user'>(
			`${getAuthUrl('check-user')}`,
			{
				email,
			}
		)
		return response.data
	},

	logout() {
		removeTokensCookie()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refresh')
		const response = await $axios.post(`${getAuthUrl('access')}`, {
			refreshToken,
		})

		if (response.data.accessToken) {
			saveTokensCookie(response.data)
		}

		return response
	},
}
