import { IBooksType } from '@/interfaces/books.interface'

export interface BooksModalProps {
	isOpen: boolean
	onClose: () => void
	booksValue: IBooksType | null
}
