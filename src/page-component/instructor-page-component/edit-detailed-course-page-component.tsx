import InstructorManageCourse from '@/components/instructor-manage-course/instructor-manage-course'
import SectionTitle from '@/components/section-title/section-title'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ICourseType } from '@/interfaces/course.interface'
import { Divider, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const EditDetailedCoursePageComponent = () => {
	const { course } = useTypedSelector(state => state.instructor)
	const router = useRouter()
	const { editCourse } = useActions()
	const toast = useToast()
	const { t } = useTranslation()

	const onSubmit = (data: ICourseType) => {
		editCourse({
			...data,
			callback: () => {
				toast({
					title: t('successfully_edited', { ns: 'instructor' }),
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
			<SectionTitle
				title={`${t('edit_course_title', { ns: 'instructor' })} ${
					router.query.slug
				}`}
				subtitle={''}
			/>
			<Divider mt={5} />
			<InstructorManageCourse
				titleBtn={t('edit_course_title', { ns: 'instructor' })}
				submitHandler={onSubmit}
				courseValues={course}
			/>
		</>
	)
}

export default EditDetailedCoursePageComponent
