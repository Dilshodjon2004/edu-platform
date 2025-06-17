import { RoleUser } from './constants.interface'

export interface IUserType {
	email?: string
	fullName?: string
	role?: RoleUser
	createdAt?: string
	password?: string
	avatar?: string
}
