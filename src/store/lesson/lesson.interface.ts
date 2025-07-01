export interface ILessonInitialStateType {
	isLoading: boolean
	error: string | null | unknown
}

export interface ILessonBodyType {
	callback: () => void
	courseId?: string
	sectionId?: string
	lessonId?: string
}
