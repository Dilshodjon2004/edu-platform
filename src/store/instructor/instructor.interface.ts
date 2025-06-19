export interface IInstructorInitialStateType {
	isLoading: boolean
	error: string | null | unknown
}

export interface IInstructorApplyBody {
	firstName: string
	lastName: string
	email: string
	socialMedia: string
	callback?: () => void
}
