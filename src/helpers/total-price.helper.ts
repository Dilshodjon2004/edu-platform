import { IBooksType } from '@/interfaces/books.interface'
import { ICourseType } from '@/interfaces/course.interface'
import { BalanceType } from '@/interfaces/instructor.interface'

export const getTotalPrice = (courses: ICourseType[], books: IBooksType[]) => {
	const booksPrice = books.reduce((total, item) => total + item.price, 0)
	const coursesPrice = courses.reduce((total, item) => total + item.price, 0)
	const totalPrice = booksPrice + coursesPrice
	return {
		totalPrice,
		booksPrice,
		coursesPrice,
	}
}

export const getBalanceObject = (balance: BalanceType) => {
	const payouts = balance.pending.reduce(
		(total, item) => total + item.amount,
		0
	)

	return {
		payouts: payouts / 100,
	}
}
