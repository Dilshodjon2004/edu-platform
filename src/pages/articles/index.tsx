import { IArticleType } from '@/interfaces/article.interface'
import { Language } from '@/interfaces/constants.interface'
import { withLayout } from '@/layouts/layout'
import { ArticlePageComponent } from '@/page-component'
import { Articles } from '@/services/article.service'
import { GetServerSideProps } from 'next'

const ArticlePage = ({ articles }: ArticlesPageProps): JSX.Element => {
	return <ArticlePageComponent articles={articles} />
}

export default withLayout(ArticlePage)

export const getServerSideProps: GetServerSideProps<
	ArticlesPageProps
> = async ({ req }) => {
	const lang: Language = req.cookies.i18next as Language
	const articles = await Articles.getArticles(lang)
	return {
		props: {
			articles,
		},
	}
}

interface ArticlesPageProps extends Record<string, unknown> {
	articles: IArticleType[]
}
