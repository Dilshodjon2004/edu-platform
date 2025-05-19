import { IArticleType } from '@/interfaces/article.interface'
import { Language } from '@/interfaces/constants.interface'
import { gql, request } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string

export const Articles = {
	async getArticles(lang: Language) {
		const query = gql`
			query Articles($lang: Language) {
				articles(where: { language: $lang }) {
					title
					excerpt
					slug
					image {
						url
					}
					language
					author {
						name
						avatar {
							url
						}
					}
					description {
						text
					}
					createdAt
				}
			}
		`
		const result = await request<{ articles: IArticleType[] }>(
			graphqlAPI,
			query,
			{ lang }
		)
		return result.articles
	},

	async getDetailedArticle(slug: string) {
		const query = gql`
			query DetailedArticle($slug: String!) {
				article(where: { slug: $slug }) {
					id
					image {
						url
					}
					title
					excerpt
					slug
					language
					author {
						name
						avatar {
							url
						}
					}
					description {
						text
						raw
					}
					createdAt
				}
			}
		`

		const result = await request<{ article: IArticleType }>(graphqlAPI, query, {
			slug,
		})
		return result.article
	},
}
