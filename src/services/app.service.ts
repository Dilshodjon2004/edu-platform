import { API_URL, getCourseUrl, getInstructorUrl } from '@/config/api.config'
import axios from 'axios'

export const AppService = {
	async getMainPageSource(language?: string) {
		const { data: courses } = await axios.get(
			`${API_URL}${getCourseUrl('all')}?language=${language}&limit=6`
		)

		const { data: instructors } = await axios.get(
			`${API_URL}${getInstructorUrl('all')}?language=${language}&limit=6`
		)

		return { courses, instructors }
	},

	async getCourses(language?: string, limit: string = '10') {
		const { data: courses } = await axios.get(
			`${API_URL}${getCourseUrl('all')}?language=${language}&limit=${limit}`
		)

		return courses
	},

	async getDetailedCourse(slug?: string) {
		const { data } = await axios.get(
			`${API_URL}${getCourseUrl('detailed-course')}/${slug}`
		)

		return data
	},
}
