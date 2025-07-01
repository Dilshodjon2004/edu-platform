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

const LessonForm = ({ sectionId, values }: LessonFormProps) => {
	const { t } = useTranslation()
	const [initialValues, setInitialValues] = useState(manageLessonValues)
	const { createLesson, getSection, clearLessonError, editLesson } =
		useActions()
	const { course } = useTypedSelector(state => state.instructor)
	const { isLoading, error } = useTypedSelector(state => state.lesson)
	const toast = useToast()

	const onSubmit = (formValues: FormikValues) => {
		const data = formValues as LessonType

		if (values) {
			editLesson({
				lessonId: values._id,
				...data,
				callback: () => {
					toast({
						title: 'Successfully edited lesson',
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					getSection({ courseId: course?._id, callback: () => {} })
				},
			})
		} else {
			createLesson({
				...data,
				sectionId,
				callback: () => {
					toast({
						title: 'Successfully added lesson',
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					getSection({ courseId: course?._id, callback: () => {} })
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
							<TextField name='name' label='Name' />
							<TextAreaField name='embedVideo' label='Embed video' />
							<Flex gap={3}>
								<TextField name='hour' label='Hour' type='number' />
								<TextField name='minute' label='Minute' type='number' />
								<TextField name='second' label='Second' type='number' />
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
								Submit
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

export default LessonForm
