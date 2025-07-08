import { FC, useEffect, useState } from 'react'
import { BooksModalProps } from './books-modal.props'
import {
	Box,
	Button,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import { BooksValidation } from '@/validations/books.validation'
import TextField from '../text-field/text-field'
import SelectField from '../select-field/select-field'
import {
	booksCategory,
	coursePrice,
	createBooksCategory,
} from '@/config/constants'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { loadImage } from '@/helpers/image.helper'
import { FaTimes } from 'react-icons/fa'
import { FileUploader } from 'react-drag-drop-files'
import { useActions } from '@/hooks/useActions'
import { FileService } from '@/services/file.service'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import ErrorAlert from '../error-alert/error-alert'

const BooksModal: FC<BooksModalProps> = ({
	isOpen,
	onClose,
	booksValue,
}): JSX.Element => {
	const [values, setValues] = useState(data)
	const [file, setFile] = useState<File | string | null>()
	const [errorFile, setErrorFile] = useState('')
	const { t } = useTranslation()
	const toast = useToast()

	const { startCreateBooksLoading, createBooks, clearBooksError, updateBooks } =
		useActions()
	const { isLoading, error } = useTypedSelector(state => state.books)

	const handleChange = (file: File) => {
		setFile(file)
	}

	const onSubmit = async (formikValues: FormikValues, { resetForm }) => {
		if (!file) {
			setErrorFile(t('preview_img_is_requried', { ns: 'global' }) as string)
			return
		}

		let imageUrl = file

		if (typeof file !== 'string') {
			startCreateBooksLoading()
			const formData = new FormData()
			formData.append('image', file as File)
			const response = await FileService.fileUpload(formData, 'books')
			imageUrl = response.url
		}

		if (!booksValue) {
			createBooks({
				title: formikValues.title,
				price: formikValues.price,
				pdf: formikValues.pdf,
				category: formikValues.category,
				image: imageUrl as string,
				callback: () => {
					toast({
						title: t('successfully_created_course', { ns: 'instructor' }),
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					setFile(null)
					onClose()
					resetForm()
				},
			})
		} else {
			updateBooks({
				title: formikValues.title,
				price: formikValues.price,
				pdf: formikValues.pdf,
				category: formikValues.category,
				image: imageUrl as string,
				_id: booksValue._id,
				callback: () => {
					toast({
						title: t('successfully_edited', { ns: 'instructor' }),
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					setFile(null)
					onClose()
					resetForm()
				},
			})
			resetForm()
		}
	}

	useEffect(() => {
		setErrorFile('')
		if (booksValue) {
			setValues(booksValue)
			setFile(booksValue.image)
		} else {
			setValues(data)
			setFile(null)
		}
	}, [booksValue])
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'xl'}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add books</ModalHeader>
				<ModalCloseButton />
				<Formik
					onSubmit={onSubmit}
					initialValues={values}
					validationSchema={BooksValidation.createBooks}
					enableReinitialize
				>
					<Form>
						<ModalBody>
							{typeof error === 'string' && (
								<ErrorAlert title={error} clearHandler={clearBooksError} />
							)}
							<VStack>
								<TextField
									name='title'
									label={t('title', { ns: 'instructor' })}
									placeholder='Harry Potter'
								/>
								<SelectField
									name='category'
									label={t('category', { ns: 'instructor' })}
									placeholder='-'
									arrOptions={createBooksCategory}
								/>
								<SelectField
									name='price'
									label={t('books_price', { ns: 'admin' })}
									placeholder='-'
									arrOptions={coursePrice}
								/>
								<TextField name='pdf' label={t('pdf_link', { ns: 'admin' })} />
								{file ? (
									<Box pos={'relative'} w={'full'} h={'200px'}>
										<Image
											src={
												typeof file === 'string'
													? loadImage(file as string)
													: URL.createObjectURL(file)
											}
											style={{ objectFit: 'cover', borderRadius: '8px' }}
											fill
											alt='preview image'
										/>
										<Icon
											as={FaTimes}
											fontSize={20}
											pos={'absolute'}
											right={2}
											top={2}
											cursor={'pointer'}
											onClick={() => setFile(null)}
										/>
									</Box>
								) : (
									<Box>
										<FileUploader
											handleChange={handleChange}
											name='file'
											types={['JPG', 'PNG', 'GIF']}
											style={{ minWidth: '100%' }}
										/>
										{errorFile && (
											<Text mt={2} fontSize='14px' color='red.500'>
												{errorFile}
											</Text>
										)}
									</Box>
								)}
							</VStack>
						</ModalBody>

						<ModalFooter>
							<Button
								type='submit'
								colorScheme='blue'
								mr={3}
								isLoading={isLoading}
							>
								{booksValue
									? t('edit_book', { ns: 'admin' })
									: t('add_book', { ns: 'admin' })}
							</Button>
						</ModalFooter>
					</Form>
				</Formik>
			</ModalContent>
		</Modal>
	)
}

export default BooksModal

const data = {
	title: '',
	price: 0,
	pdf: '',
	category: '',
}
