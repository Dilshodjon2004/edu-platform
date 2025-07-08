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
		const { data } = await $axios.patch<IBooksType>(
			`${getBooksUrl('update')}/${body._id}`,
			body
		)

		return data
	},

	async delete(id: string) {
		const { data } = await $axios.delete<IBooksType>(
			`${getBooksUrl('delete')}/${id}`
		)

		return data
	},

	async get() {
		const { data } = await axios.get<IBooksType[]>(
			`${API_URL}${getBooksUrl('find-all')}`
		)

		return data
	},
}
