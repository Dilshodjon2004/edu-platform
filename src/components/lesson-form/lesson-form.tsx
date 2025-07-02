import {
	Box,
	Button,
	Flex,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import TextField from '../text-field/text-field'
import TextAreaField from '../text-area-field/text-area-field'
import { editLessonModules } from '@/config/editor.config'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import {
	CourseValidation,
	manageLessonValues,
} from '@/validations/course.validation'
import { useActions } from '@/hooks/useActions'
import { LessonType } from '@/interfaces/instructor.interface'
import { LessonFormProps } from './lesson-form.props'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import ErrorAlert from '../error-alert/error-alert'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const LessonForm = ({ sectionId, values, onToggle }: LessonFormProps) => {
	const { t } = useTranslation()
	const [initialValues, setInitialValues] = useState(manageLessonValues)
	const { createLesson, clearLessonError, editLesson } = useActions()
	const { isLoading, error } = useTypedSelector(state => state.section)
	const toast = useToast()

	const onSubmit = (formValues: FormikValues, { resetForm }) => {
		const data = formValues as LessonType

		if (values) {
			editLesson({
				lessonId: values._id,
				...data,
				callback: () => {
					toast({
						title: t('successfully_edited', { ns: 'instructor' }),
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					onToggle()
					resetForm()
				},
			})
		} else {
			createLesson({
				...data,
				sectionId,
				callback: () => {
					toast({
						title: t('successfully_created_course', { ns: 'instructor' }),
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					onToggle()
					resetForm()
				},
			})
		}
	}

	useEffect(() => {
		if (values?._id) {
			setInitialValues(values)
		}
	}, [values])
	return (
		<Box
			p={5}
			mt='4'
			border={'1px'}
			borderRadius={'lg'}
			borderColor={useColorModeValue('gray.200', 'gray.500')}
		>
			<Formik
				onSubmit={onSubmit}
				initialValues={initialValues}
				validationSchema={CourseValidation.lesson}
				enableReinitialize
			>
				{formik => (
					<Form>
						<Stack spacing={5}>
							{typeof error === 'string' && (
								<ErrorAlert title={error} clearHandler={clearLessonError} />
							)}
							<TextField name='name' label={t('name', { ns: 'instructor' })} />
							<TextAreaField
								name='embedVideo'
								label={t('embed_video', { ns: 'instructor' }) || 'Embed video'}
							/>
							<Flex gap={3}>
								<TextField
									name='hour'
									label={t('hour', { ns: 'instructor' })}
									type='number'
								/>
								<TextField
									name='minute'
									label={t('minute', { ns: 'instructor' })}
									type='number'
								/>
								<TextField
									name='second'
									label={t('second', { ns: 'instructor' })}
									type='number'
								/>
							</Flex>
							<Box>
								<ReactQuill
									modules={editLessonModules}
									onChange={data => formik.setFieldValue('material', data)}
									value={formik.values?.material}
								/>
								{formik.errors.material && formik.touched.material && (
									<Text mt={2} fontSize='14px' color='red.500'>
										{formik.errors.material as string}
									</Text>
								)}
							</Box>
							<Button
								h={14}
								mt={4}
								w={'full'}
								colorScheme={'blue'}
								type={'submit'}
								isLoading={isLoading}
								loadingText={`${t('loading', { ns: 'global' })}`}
							>
								{t('search_input_btn', { ns: 'courses' })}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

export default LessonForm
