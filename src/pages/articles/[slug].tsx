import { IArticleType } from '@/interfaces/article.interface'
import { Language } from '@/interfaces/constants.interface'
import { withLayout } from '@/layouts/layout'
import Seo from '@/layouts/seo/seo'
import { ArticleDetailedComponent } from '@/page-component'
import { Articles } from '@/services/article.service'
import { GetServerSideProps } from 'next'

const ArticleDetailedPage = ({ article }: ArticleDetailedPageProps) => {
	return (
		<Seo metaTitle={article.title} metaDescription={article.excerpt}>
			<ArticleDetailedComponent article={article} />
		</Seo>
	)
}

export default withLayout(ArticleDetailedPage)

export const getServerSideProps: GetServerSideProps = async ({
	query,
	req,
}) => {
	const slug: string = query.slug as string
	const lang: Language = req.cookies.i18next as Language

	const article = await Articles.getDetailedArticle(slug)

	if (article.language === lang) {
		return {
			props: {
				article,
			},
		}
	}

	return {
		redirect: {
			destination: '/articles',
			permanent: false,
		},
	}
}

interface ArticleDetailedPageProps extends Record<string, unknown> {
	article: IArticleType
}
