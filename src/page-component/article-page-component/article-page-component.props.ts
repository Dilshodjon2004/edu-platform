import { IArticleType } from '@/interfaces/article.interface'

export interface ArticlePageComponentProps {
	articles: IArticleType[]
}

export interface ArticleDetailedComponentProps {
	article: IArticleType
}
