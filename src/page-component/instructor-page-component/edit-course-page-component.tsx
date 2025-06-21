import InstructorEditCourseCard from '@/components/instructor-courses-card/instructor-edit-course-card'
import SectionTitle from '@/components/section-title/section-title'
import { courses } from '@/config/constants'
import { Grid } from '@chakra-ui/react'

const EditCoursePageComponent = () => {
	return (
		<>
			<SectionTitle
				title='Edit courses'
				subtitle='Managing courses and create curriculum for your courses'
			/>
			<Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
				{courses.map(course => (
					<InstructorEditCourseCard key={course.slug} item={course} />
				))}
			</Grid>
		</>
	)
}

export default EditCoursePageComponent
