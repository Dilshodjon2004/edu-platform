import { LessonType } from '@/interfaces/instructor.interface'

export interface LessonAccordionItemProps {
	lesson: LessonType
	sectionId: string
	lessonIndex: number
}
