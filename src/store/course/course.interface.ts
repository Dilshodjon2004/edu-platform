import { ICourseType } from '@/interfaces/course.interface'

export interface ICourseInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	course: ICourseType | null
	courses: ICourseType[]
}

export interface ICreateCourseBody extends ICourseType {
	callback: () => void
}

export interface IById {
	courseId: string
	callback: () => void
}
