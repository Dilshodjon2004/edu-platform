import { IAuthTokens, IAuthUserResponse } from '@/store/user/user.interface'
import Cookies from 'js-cookie'

export const saveTokensCookie = (data: IAuthTokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const saveStorage = (data: IAuthUserResponse) => {
	saveTokensCookie(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeTokensCookie = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}
