import { ICourseType } from '@/interfaces/course.interface'

export interface ICourseInitialStateType {
	isLoading: boolean
	error: string | null | unknown
}

export interface ICreateCourseBody extends ICourseType {
	callback: () => void
}

export interface IById {
	courseId: string
	callback: () => void
}
