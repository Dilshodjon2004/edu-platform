import InstructorEditCourseCard from '@/components/instructor-courses-card/instructor-edit-course-card'
import SectionTitle from '@/components/section-title/section-title'
// import { courses } from '@/config/constants'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Grid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const EditCoursePageComponent = () => {
	const { t } = useTranslation()
	const { courses } = useTypedSelector(state => state.instructor)
	return (
		<>
			<SectionTitle
				title={t('edit_course_title', { ns: 'instructor' })}
				subtitle={t('edit_course_description', { ns: 'instructor' })}
			/>
			<Grid gridTemplateColumns={'50% 50%'} gap={4}>
				{courses.map(course => (
					<InstructorEditCourseCard key={course.slug} item={course} />
				))}
			</Grid>
		</>
	)
}

export default EditCoursePageComponent
