import InstructorManageCourse from '@/components/instructor-manage-course/instructor-manage-course'
import { SubmitValuesInterface } from '@/components/instructor-manage-course/instructor-manage-course.props'
import { Divider } from '@chakra-ui/react'
import 'react-quill/dist/quill.snow.css'
import SectionTitle from 'src/components/section-title/section-title'

const CreateCoursePageComponent = () => {
	const onSubmit = (data: SubmitValuesInterface) => {
		console.log(data)
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
