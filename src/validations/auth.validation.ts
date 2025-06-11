import * as Yup from 'yup'

export const AuthValidation = {
	register() {
		return Yup.object({
			email: Yup.string()
				.email('Email is invalid!')
				.required('Email is required!'),
			password: Yup.string()
				.min(6, 'Password should not be less than 6 characters!')
				.required('Password is required!'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password')], "Password doesn't match!")
				.required('Confirm password is required!'),
		})
	},
	login() {
		return Yup.object({
			email: Yup.string()
				.email('Email is invalid!')
				.required('Email is required!'),
			password: Yup.string()
				.min(6, 'Password should not be less than 6 characters!')
				.required('Password is required!'),
		})
	},
	otp() {
		return Yup.object({
			otp: Yup.string()
				.required('Write OTP verification code!')
				.min(6, 'OTP should be 6 digits number!'),
		})
	},
}
