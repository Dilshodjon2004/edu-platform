import { IBooksType } from '@/interfaces/books.interface'
import { ICourseType } from '@/interfaces/course.interface'

export const getTotalPrice = (
	courses: ICourseType[],
	books: IBooksType[]
): number => {
	const booksPrice = books.reduce((total, item) => total + item.price, 0)
	const coursesPrice = courses.reduce((total, item) => total + item.price, 0)
	const totalPrice = booksPrice + coursesPrice
	return totalPrice
}
