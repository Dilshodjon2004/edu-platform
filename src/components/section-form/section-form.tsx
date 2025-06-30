import { Form, Formik, FormikValues } from 'formik'
import TextField from '../text-field/text-field'
import { Button, useToast } from '@chakra-ui/react'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import ErrorAlert from '../error-alert/error-alert'
import { useTranslation } from 'react-i18next'
import { SectionFormProps } from './section-form.props'

const SectionForm = ({ onClose }: SectionFormProps) => {
	const { t } = useTranslation()
	const toast = useToast()
	const { createSection, clearSectionError, getSection } = useActions()
	const { error, isLoading } = useTypedSelector(state => state.section)
	const { course } = useTypedSelector(state => state.instructor)

	const onSubmit = (formValues: FormikValues) => {
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
				getSection({
					courseId: course?._id,
					callback: () => {},
				})
			},
		})
	}

	return (
		<Formik onSubmit={onSubmit} initialValues={{ title: '' }}>
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
