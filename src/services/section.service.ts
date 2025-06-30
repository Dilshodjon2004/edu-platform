import $axios from '@/api/axios'
import { getSectionUrl } from '@/config/api.config'
import { ISectionBodyType } from '@/store/section/section.interface'

export const SectionService = {
	async createSection(body: ISectionBodyType) {
		const response = await $axios.post(
			`${getSectionUrl('create')}/${body.courseId}`,
			{
				title: body.title,
			}
		)

		return response.data
	},

	async deleteSection(body: ISectionBodyType) {
		const response = await $axios.delete(
			`${getSectionUrl('delete')}/${body.sectionId}/${body.courseId}`
		)

		return response.data
	},

	async editSection(body: ISectionBodyType) {
		const response = await $axios.put(
			`${getSectionUrl('edit')}/${body.sectionId}`,
			{
				title: body.title,
			}
		)

		return response.data
	},

	async getSection(body: ISectionBodyType) {
		const response = await $axios.get(
			`${getSectionUrl('get')}/${body.courseId}`
		)

		return response.data
	},
}
