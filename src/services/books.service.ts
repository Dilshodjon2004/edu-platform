import $axios from '@/api/axios'
import { API_URL, getBooksUrl } from '@/config/api.config'
import { IBooksType } from '@/interfaces/books.interface'
import axios from 'axios'

export const BooksService = {
	async create(body: IBooksType) {
		const { data } = await $axios.post<IBooksType>(
			`${getBooksUrl('create')}`,
			body
		)

		return data
	},

	async update(body: IBooksType) {
		const { data } = await $axios.post<IBooksType>(
			`${getBooksUrl('update')}/${body._id}`,
			body
		)

		return data
	},

	async delete(id: string) {
		const { data } = await $axios.post<IBooksType>(
			`${getBooksUrl('delete')}/${id}`
		)

		return data
	},

	async get(id: string) {
		const { data } = await axios.post<IBooksType>(
			`${API_URL}${getBooksUrl('find-all')}/${id}`
		)

		return data
	},
}
