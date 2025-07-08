import { IBooksType } from '@/interfaces/books.interface'
import { withLayout } from '@/layouts/layout'
import Seo from '@/layouts/seo/seo'
import { BooksPageComponent } from '@/page-component'
import { BooksService } from '@/services/books.service'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'react-i18next'

const Books = () => {
	const { t } = useTranslation()

	return (
		<Seo
			metaTitle={
				`Sammi | ${t('books_page_title', { ns: 'seo' })}` || 'Sammi | Books'
			}
			metaDescription={
				`Sammi | ${t('books_page_description', { ns: 'seo' })}` ||
				'Sammi can advice books for you'
			}
		>
			<BooksPageComponent />
		</Seo>
	)
}

export default withLayout(Books)

export const getServerSideProps: GetServerSideProps<
	BooksPageProps
> = async () => {
	const books = await BooksService.get()

	return {
		props: {
			books,
		},
	}
}

interface BooksPageProps {
	books: IBooksType[]
}
