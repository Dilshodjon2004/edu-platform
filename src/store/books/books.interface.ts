import { IBooksType } from '@/interfaces/books.interface'

export interface IBooksInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	books: IBooksType[]
}

export interface BooksActionBody extends IBooksType {
	callback: () => void
}
