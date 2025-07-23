import { IUserType } from './user.interface'

export interface InstructorType {
	_id: string
	fullName: string
	avatar: string
	totalCourses: number
	studentsCount: number
	email: string
	socialMedia: string
	author: IUserType
	approved: boolean
}

export interface SectionType {
	_id: string
	title: string
	lessons: LessonType[]
}

export interface LessonType {
	name: string
	material: string
	embedVideo: string
	hour: number
	minute: number
	second: number
	_id: string
	completed: string[]
}

export interface BalanceType {
	available: AmountBalanceType[]
	instant_available: AmountBalanceType[]
	pending: AmountBalanceType[]
}

interface AmountBalanceType {
	amount: number
}
