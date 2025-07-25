export interface ICourseType {
	title: string
	slug: string
	lessonCount: number
	totalHour: number
	level: string
	price: number
	reviewAvarage: number
	reviewCount: number
	author: ICourseAuthorType
	previewImage: string
	tags: string[]
	learn: string[]
	requirements: string[]
	excerpt: string
	description: string
	category: string
	_id: string
	language: string
	isActive: boolean
	updatedAt: Date
}

export interface ICourseAuthorType {
	fullName: string
	avatar: string
	job: string
}
