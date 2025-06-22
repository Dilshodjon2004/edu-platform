import InstructorManageCourse from '@/components/instructor-manage-course/instructor-manage-course'
import { SubmitValuesInterface } from '@/components/instructor-manage-course/instructor-manage-course.props'
import SectionTitle from '@/components/section-title/section-title'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Divider } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const EditDetailedCoursePageComponent = () => {
	const { course } = useTypedSelector(state => state.instructor)
	const router = useRouter()

	const onSubmit = (data: SubmitValuesInterface) => {
		console.log(data)
	}
	return (
		<>
			<SectionTitle title={`Edit course ${router.query.slug}`} subtitle={''} />
			<Divider mt={5} />
			<InstructorManageCourse
				titleBtn='Edit course'
				submitHandler={onSubmit}
				courseValues={course}
			/>
		</>
	)
}

export default EditDetailedCoursePageComponent
