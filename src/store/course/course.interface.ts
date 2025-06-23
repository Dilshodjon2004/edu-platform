import { ICourseType } from '@/interfaces/course.interface'

export interface ICourseInitialStateType {
	isLoading: boolean
	error: string | null | unknown
}

export interface ICreateCourseBody extends ICourseType {
	callback: () => void
}

export interface IDeleteBody {
	courseId: string
	callback: () => void
}
