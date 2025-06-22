import InstructorManageCourse from '@/components/instructor-manage-course/instructor-manage-course'
import { SubmitValuesInterface } from '@/components/instructor-manage-course/instructor-manage-course.props'
import { useActions } from '@/hooks/useActions'
import { Divider, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css'
import SectionTitle from 'src/components/section-title/section-title'

const CreateCoursePageComponent = () => {
	const { createCourse } = useActions()
	const toast = useToast()
	const router = useRouter()

	const onSubmit = (data: SubmitValuesInterface) => {
		createCourse({
			...data,
			callback: () => {
				toast({
					title: 'Course created successfully',
					description: 'You can customize your curriculum for this course.',
					position: 'top-right',
					duration: 1500,
					isClosable: true,
				})
				router.push('/instructor/courses')
			},
		})
	}
	return (
		<>
			<SectionTitle
				title='Create course'
				subtitle="Note that when you're creating course it will be draft"
			/>
			<Divider mt={5} />
			<InstructorManageCourse
				titleBtn='Create course'
				submitHandler={onSubmit}
			/>
		</>
	)
}

export default CreateCoursePageComponent
