import {
	Box,
	Button,
	Flex,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { Form, Formik, FormikValues } from 'formik'
import TextField from '../text-field/text-field'
import TextAreaField from '../text-area-field/text-area-field'
import { editLessonModules } from '@/config/editor.config'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const LessonForm = () => {
	const onSubmit = (formValues: FormikValues) => {
		console.log(formValues)
	}
	return (
		<Box
			p={5}
			mt='4'
			border={'1px'}
			borderRadius={'lg'}
			borderColor={useColorModeValue('gray.200', 'gray.500')}
		>
			<Formik onSubmit={onSubmit} initialValues={{ material: '' }}>
				{formik => (
					<Form>
						<Stack spacing={5}>
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
									value={formik.values.material}
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
