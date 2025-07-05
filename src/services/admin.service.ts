import { API_URL, getCourseUrl } from '@/config/api.config'
import axios from 'axios'

export const AdminService = {
	async getAllCourses() {
		const { data } = await axios.get(
			`${API_URL}${getCourseUrl('admin-all-courses')}`
		)
		return data
	},
}
