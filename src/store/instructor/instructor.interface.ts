import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'

export interface IInstructorInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	courses: ICourseType[]
	course: ICourseType | null
	instructors: InstructorType[]
}

export interface IInstructorApplyBody {
	firstName: string
	lastName: string
	email: string
	socialMedia: string
	callback: () => void
}
