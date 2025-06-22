import { SubmitValuesInterface } from '@/components/instructor-manage-course/instructor-manage-course.props'

export interface ICourseInitialStateType {
	isLoading: boolean
	error: string | null | unknown
}

export interface ICreateCourseBody extends SubmitValuesInterface {
	callback: () => void
}
