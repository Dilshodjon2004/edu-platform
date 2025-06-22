import { ICourseType } from '@/interfaces/course.interface'

export interface IInstructorInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	courses: ICourseType[]
	course: ICourseType | null
}

export interface IInstructorApplyBody {
	firstName: string
	lastName: string
	email: string
	socialMedia: string
	callback: () => void
}
