import { IUserType } from '@/interfaces/user.interface'

export interface IUserInitialStateType {
	user: IUserType | null
	isLoading: boolean
	error: string | null | unknown
}

export interface IAuthTokens {
	refreshToken: string
	accessToken: string
}

export interface IAuthUserResponse extends IAuthTokens {
	user: IUserType
}

export interface IEmailAndPassword {
	email: string
	password: string
}

export interface IEmailAndOtp {
	email: string
	otpVerification: string
}

export interface ISign {
	email: string
	password: string
	callback?: () => void
}
