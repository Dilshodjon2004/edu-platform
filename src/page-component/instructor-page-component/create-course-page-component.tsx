import InstructorManageCourse from '@/components/instructor-manage-course/instructor-manage-course'
import { useActions } from '@/hooks/useActions'
import { ICourseType } from '@/interfaces/course.interface'
import { Divider, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import 'react-quill/dist/quill.snow.css'
import SectionTitle from 'src/components/section-title/section-title'

const CreateCoursePageComponent = () => {
	const { createCourse } = useActions()
	const toast = useToast()
	const router = useRouter()
	const { t } = useTranslation()

	const onSubmit = (data: ICourseType) => {
		createCourse({
			...data,
			callback: () => {
				toast({
					title: t('successfully_created_course', { ns: 'instructor' }),
					description: t('successfully_created_course_description', {
						ns: 'instructor',
					}),
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
				title={t('create_course_title', { ns: 'instructor' })}
				subtitle={t('create_course_description', { ns: 'instructor' })}
			/>
			<Divider mt={5} />
			<InstructorManageCourse
				titleBtn={t('create_course_btn', { ns: 'instructor' })}
				submitHandler={onSubmit}
			/>
		</>
	)
}

export default CreateCoursePageComponent
