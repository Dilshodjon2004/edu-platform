import InstructorManageCourse from '@/components/instructor-manage-course/instructor-manage-course'
import SectionTitle from '@/components/section-title/section-title'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ICourseType } from '@/interfaces/course.interface'
import { Divider, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const EditDetailedCoursePageComponent = () => {
	const { course } = useTypedSelector(state => state.instructor)
	const router = useRouter()
	const { editCourse } = useActions()
	const toast = useToast()

	const onSubmit = (data: ICourseType) => {
		editCourse({
			...data,
			callback: () => {
				toast({
					title: 'Course edited successfully',
					position: 'top-right',
					duration: 1500,
					isClosable: true,
				})
				router.push('/instructor/edit-courses')
			},
		})
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
