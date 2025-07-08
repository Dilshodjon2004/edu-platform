import { IBooksType } from '@/interfaces/books.interface'
import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { ReactNode } from 'react'

export interface LayoutProps {
	children: ReactNode
}

export interface AppProviderProps {
	courses: ICourseType[]
	course: ICourseType
	instructors: InstructorType[]
	books: IBooksType[]
}
