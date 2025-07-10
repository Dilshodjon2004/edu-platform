import { IBooksType } from '@/interfaces/books.interface'
import { ICourseType } from '@/interfaces/course.interface'

export interface ICartInitialState {
	books: IBooksType[]
	courses: ICourseType[]
}
