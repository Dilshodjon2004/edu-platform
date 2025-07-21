import { IBooksType } from '@/interfaces/books.interface'
import { ProductsType } from '@/interfaces/constants.interface'
import { ICourseType } from '@/interfaces/course.interface'

export interface ICartInitialState {
	books: IBooksType[]
	courses: ICourseType[]
	product: ProductsType;
}
