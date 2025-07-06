import { API_URL, getAdminUrl, getCourseUrl } from '@/config/api.config'
import { InstructorType } from '@/interfaces/instructor.interface'
import axios from 'axios'

export const AdminService = {
	async getAllCourses() {
		const { data } = await axios.get(
			`${API_URL}${getCourseUrl('admin-all-courses')}`
		)
		return data
	},

	async getAllInstructors(token?: string) {
		const { data } = await axios.get<InstructorType[]>(
			`${API_URL}${getAdminUrl('all-instructors')}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		return data
	},
}
