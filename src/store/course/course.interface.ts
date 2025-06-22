import { SubmitValuesInterface } from '@/components/instructor-manage-course/instructor-manage-course.props'
import { ICourseType } from '@/interfaces/course.interface'

export interface ICourseInitialStateType {
	isLoading: boolean
	error: string | null | unknown
}

export interface ICreateCourseBody extends SubmitValuesInterface {
	callback: () => void
}
