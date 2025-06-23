import $axios from '@/api/axios'
import { getCourseUrl } from '@/config/api.config'
import { ICourseType } from '@/interfaces/course.interface'

export const CourseService = {
	async createCourse(body: ICourseType) {
		const response = await $axios.post(`${getCourseUrl('create')}`, body)

		return response.data
	},

	async editCourse(body: ICourseType, id: string) {
		const response = await $axios.patch(`${getCourseUrl('edit')}/${id}`, body)

		return response.data
	},

	async deleteCourse(id: string) {
		const response = await $axios.delete(`${getCourseUrl('delete')}/${id}`)

		return response.data
	},
}
