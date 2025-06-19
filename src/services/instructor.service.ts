import { API_URL, getInstructorUrl } from '@/config/api.config'
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
}
