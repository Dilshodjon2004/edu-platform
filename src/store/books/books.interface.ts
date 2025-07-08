import { IBooksType } from '@/interfaces/books.interface'

export interface IBooksInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	books: IBooksType[]
}

export interface BooksActionBody extends IBooksType {
	callback: () => void
}

export interface DeleteBooksBody {
	callback: () => void
	booksId: string
}
