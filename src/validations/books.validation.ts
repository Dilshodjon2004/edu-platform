import * as Yup from 'yup'

export const BooksValidation = {
	createBooks() {
		return Yup.object({
			title: Yup.string().required('title is required'),
			price: Yup.number().required('price is required'),
			pdf: Yup.string().required('PDF is required'),
		})
	},
}
