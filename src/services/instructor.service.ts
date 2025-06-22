import $axios from '@/api/axios'
import { API_URL, getInstructorUrl } from '@/config/api.config'
import { ICourseType } from '@/interfaces/course.interface'
import { IInstructorApplyBody } from '@/store/instructor/instructor.interface'
import axios from 'axios'

export const InstructorService = {
	async applyInstructor(body: IInstructorApplyBody) {
		const response = await axios.post<'success'>(
			`${API_URL}${getInstructorUrl('apply')}`,
			body
		)

		return response.data
	},
	async getAllCourses(token?: string) {
		const response = await axios.get<ICourseType[]>(
			`${API_URL}${getInstructorUrl('course-all')}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return response.data
	},

	async getDetailedCourse(token?: string, slug?: string) {
		const response = await $axios.get(
			`${getInstructorUrl(`course/${slug}`)} `,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		return response.data
	},
}
