import { LessonType } from '@/interfaces/instructor.interface'

export interface ILessonInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	lesson: LessonType
}

export interface ILessonBodyType {
	callback: () => void
	courseId?: string
	sectionId?: string
	lessonId?: string
}
