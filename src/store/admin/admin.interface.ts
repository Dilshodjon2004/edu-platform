import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IUserType } from '@/interfaces/user.interface'

export interface IAdminInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	courses: ICourseType[]
	instructors: InstructorType[]
	users: IUserType[]
}

export interface ICreateCourseBody extends ICourseType {
	callback: () => void
}

export interface IById {
	courseId: string
	callback: () => void
}
