import $axios from '@/api/axios'
import { API_URL, getAdminUrl, getCourseUrl } from '@/config/api.config'
import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IUserType } from '@/interfaces/user.interface'
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

	async approveInstructor(instructorId: string) {
		const { data } = await $axios.put<'success'>(
			`${getAdminUrl('approve-instructor')}`,
			{
				instructorId,
			}
		)

		return data
	},

	async deleteInstructor(instructorId: string) {
		const { data } = await $axios.put<'success'>(
			`${getAdminUrl('delete-instructor')}`,
			{
				instructorId,
			}
		)

		return data
	},

	async getUsers(limit: string, token?: string) {
		const { data } = await axios.get<IUserType[]>(
			`${API_URL}${getAdminUrl('all-users')}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					limit,
				},
			}
		)
		return data
	},

	async searchUsers(query: string, limit: string) {
		const { data } = await $axios.get<IUserType[]>(
			`${getAdminUrl('search-users')}`,
			{
				params: {
					email: query,
					limit,
				},
			}
		)

		return data
	},

	async deleteCourse(courseId: string) {
		const { data } = await $axios.delete<ICourseType[]>(
			`${getAdminUrl('delete-course')}`,
			{
				params: {
					courseId,
				},
			}
		)

		return data
	},
}
