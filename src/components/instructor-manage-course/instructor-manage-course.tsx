import {
	Box,
	Button,
	Flex,
	FormLabel,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { GiSave } from 'react-icons/gi'
import 'react-quill/dist/quill.snow.css'
import {
	courseCategory,
	courseLanguage,
	courseLevel,
	coursePrice,
} from 'src/config/constants'
import { editorModules } from 'src/config/editor.config'
import {
	CourseValidation,
	manageCourseValues,
} from 'src/validations/course.validation'
import SelectField from '../select-field/select-field'
import TextAreaField from '../text-area-field/text-area-field'
import { InstructorManageCourseProps } from './instructor-manage-course.props'
import TextField from '../text-field/text-field'
import TagField from '../tag-field/tag-field'
import { FileService } from '@/services/file.service'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { useActions } from '@/hooks/useActions'
import ErrorAlert from '../error-alert/error-alert'
import Image from 'next/image'
import { loadImage } from '@/helpers/image.helper'
import { FaTimes } from 'react-icons/fa'
import { ICourseType } from '@/interfaces/course.interface'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const InstructorManageCourse = ({
	submitHandler,
	titleBtn,
	courseValues,
}: InstructorManageCourseProps) => {
	const [file, setFile] = useState<File | string | null>()
	const [errorFile, setErrorFile] = useState('')
	const [initialValues, setInitialValues] = useState(manageCourseValues)

	const { error, isLoading } = useTypedSelector(state => state.course)
	const { clearCourseError, startLoading } = useActions()
	const { t } = useTranslation()

	const handleChange = (file: File) => {
		setFile(file)
	}

	const onSubmit = async (formValues: FormikValues, { resetForm }) => {
		if (!file) {
			setErrorFile('Preview image is required')
			return
		}
		let imageUrl = file

		if (typeof file !== 'string') {
			startLoading()
			const formData = new FormData()
			formData.append('image', file as File)
			const response = await FileService.fileUpload(formData, 'preview-image')
			imageUrl = response.url
		}
		const data = {
			...formValues,
			previewImage: imageUrl,
		} as ICourseType

		submitHandler(data)
		resetForm()
	}

	useEffect(() => {
		if (courseValues) {
			setInitialValues(courseValues)
			setFile(courseValues.previewImage)
		}
	}, [courseValues])

	return (
		<>
			<Formik
				onSubmit={onSubmit}
				initialValues={initialValues}
				validationSchema={CourseValidation.create}
				enableReinitialize
			>
				{formik => (
					<Form>
						<Flex mt={12} gap={4}>
							<Box w={'70%'}>
								<Stack spacing={5}>
									<TextField
										name='title'
										label={t('title', { ns: 'instructor' })}
										placeholder='JavaScript from 0 to hero'
									/>
									<TextAreaField
										name='excerpt'
										placeholder='Full course about JavaScript'
										height={'150px'}
										label={t('excerpt', { ns: 'instructor' }) || 'Exerpt'}
									/>

									<TagField
										label={t('what_students_will_learn', {
											ns: 'instructor',
										})}
										name='learn'
										values={formik.values.learn}
										placeholder='Full project...'
										formik={formik}
										errorMessage={
											formik.touched.learn
												? (formik.errors.learn as string)
												: ''
										}
									/>
									<TagField
										label={t('requirements', { ns: 'instructor' })}
										name='requirements'
										values={formik.values.requirements}
										placeholder=''
										formik={formik}
										errorMessage={
											formik.touched.requirements
												? (formik.errors.requirements as string)
												: ''
										}
									/>
									<TagField
										label={t('course_tags', { ns: 'instructor' })}
										values={formik.values.tags}
										name='tags'
										placeholder='JavaScript...'
										formik={formik}
										errorMessage={
											formik.touched.tags ? (formik.errors.tags as string) : ''
										}
									/>
									<Box>
										<FormLabel mb={3}>
											{t('description', { ns: 'instructor' })}{' '}
											<Box as={'span'} color={'red.300'}>
												*
											</Box>
										</FormLabel>
										<ReactQuill
											modules={editorModules}
											onChange={data =>
												formik.setFieldValue('description', data)
											}
											value={formik.values.description}
										/>
										{formik.errors.description &&
											formik.touched.description && (
												<Text mt={2} fontSize='14px' color='red.500'>
													{formik.errors.description as string}
												</Text>
											)}
									</Box>
									{typeof error === 'string' && (
										<ErrorAlert title={error} clearHandler={clearCourseError} />
									)}
									<Button
										w={'full'}
										type={'submit'}
										h={14}
										colorScheme={'blue'}
										rightIcon={<GiSave />}
										isLoading={isLoading}
										loadingText={`${t('loading', { ns: 'global' })}`}
									>
										{titleBtn}
									</Button>
								</Stack>
							</Box>
							<Box w={'30%'}>
								<Stack spacing={5}>
									<SelectField
										name='level'
										label={t('level', { ns: 'instructor' })}
										placeholder='-'
										arrOptions={courseLevel}
									/>
									<SelectField
										name='category'
										label={t('category', { ns: 'instructor' })}
										placeholder='-'
										arrOptions={courseCategory}
									/>
									<SelectField
										name='price'
										label={t('price', { ns: 'instructor' })}
										placeholder='-'
										arrOptions={coursePrice}
									/>
									<SelectField
										name='language'
										label={t('language', { ns: 'instructor' })}
										placeholder='-'
										arrOptions={courseLanguage}
									/>
									<FormLabel>
										{t('course_preview_image', { ns: 'instructor' })}{' '}
										<Box as={'span'} color={'red.300'}>
											*
										</Box>
									</FormLabel>
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
								</Stack>
							</Box>
						</Flex>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default InstructorManageCourse
