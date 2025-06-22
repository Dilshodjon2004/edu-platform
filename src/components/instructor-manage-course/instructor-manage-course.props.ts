import { ICourseType } from '@/interfaces/course.interface'

export interface InstructorManageCourseProps {
	titleBtn: string
	submitHandler: (data: SubmitValuesInterface) => void
	courseValues?: ICourseType | null
}

export interface SubmitValuesInterface {
	title: string
	excerpt: string
	learn: string[]
	requirements: string[]
	description: string
	level: string
	category: string
	price: number
	tags: string[]
	previewImage: string
}
