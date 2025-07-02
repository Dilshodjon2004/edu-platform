import { Form, Formik, FormikValues } from 'formik'
import TextField from '../text-field/text-field'
import { Button, useToast } from '@chakra-ui/react'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import ErrorAlert from '../error-alert/error-alert'
import { useTranslation } from 'react-i18next'
import { SectionFormProps } from './section-form.props'
import { useEffect, useState } from 'react'
import { CourseValidation } from '@/validations/course.validation'

const SectionForm = ({ onClose, values }: SectionFormProps) => {
	const [initialValues, setInitialValues] = useState<{ title: string }>({
		title: '',
	})

	const { t } = useTranslation()
	const toast = useToast()
	const { createSection, clearSectionError, editSection } = useActions()
	const { error, isLoading } = useTypedSelector(state => state.section)
	const { course } = useTypedSelector(state => state.instructor)

	const onSubmit = (formValues: FormikValues) => {
		if (values) {
			editSection({
				sectionId: values.id,
				title: formValues.title,
				callback: () => {
					toast({
						title: 'Section edited successfully',
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					onClose()
				},
			})
		} else {
			createSection({
				title: formValues.title,
				courseId: course?._id as string,
				callback: () => {
					toast({
						title: 'Section created successfully',
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					onClose()
				},
			})
		}
	}

	useEffect(() => {
		setInitialValues({ title: values?.title as string })
	}, [values])

	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={initialValues}
			validationSchema={CourseValidation.section}
			enableReinitialize
		>
			<Form>
				{typeof error === 'string' && (
					<ErrorAlert title={error} clearHandler={clearSectionError} />
				)}
				<TextField name={'title'} label='Title' />
				<Button
					h={14}
					mt={4}
					w={'full'}
					colorScheme='blue'
					type='submit'
					isLoading={isLoading}
					loadingText={`${t('loading', { ns: 'global' })}`}
				>
					Submit
				</Button>
			</Form>
		</Formik>
	)
}

export default SectionForm
