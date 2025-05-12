export interface ICourseType {
	image: string
	title: string
	lessonCount: number
	totalHour: number
	level: string
	price: number
	reviewAvarage: number
	reviewCount: number
	author: ICourseAuthorType
}

export interface ICourseAuthorType {
	firstName: string
	lastName: string
	avatar: string
}
