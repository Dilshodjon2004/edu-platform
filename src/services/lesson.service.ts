import $axios from '@/api/axios'
import { getLessonUrl } from '@/config/api.config'
import { ILessonBodyType } from '@/store/lesson/lesson.interface'

export const LessonService = {
	async createLesson(body: ILessonBodyType) {
		const response = await $axios.post(
			`${getLessonUrl('create')}/${body.sectionId}`,
			body
		)

		return response.data
	},

	async deleteLesson(body: ILessonBodyType) {
		const response = await $axios.delete(
			`${getLessonUrl('delete')}/${body.lessonId}/${body.sectionId}`
		)

		return response.data
	},

	async editLesson(body: ILessonBodyType) {
		const response = await $axios.put(
			`${getLessonUrl('edit')}/${body.lessonId}`,
			body
		)

		return response.data
	},

	async getLesson(body: ILessonBodyType) {
		const response = await $axios.get(`${getLessonUrl('get')}/${body.courseId}`)

		return response.data
	},
}
