export interface IArticleType {
	createdAt: string
	excerpt: string
	id: string
	image: {
		url: string
	}
	slug: string
	title: string
	language: string
	author: IArticleAuthorType
	description: {
		text: string
		raw: []
	}
}

export interface IArticleAuthorType {
	name: string
	avatar: {
		url: string
	}
}
