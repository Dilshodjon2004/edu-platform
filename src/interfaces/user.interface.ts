import { RoleUser } from './constants.interface'

export interface IUserType {
	id: string
	email?: string
	fullName?: string
	role?: RoleUser
	createdAt?: string
	password?: string
	avatar?: string
	job?: string
	courses: string[]
}
