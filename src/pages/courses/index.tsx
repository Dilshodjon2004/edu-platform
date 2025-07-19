import { ICourseType } from '@/interfaces/course.interface'
import { withLayout } from '@/layouts/layout'
import Seo from '@/layouts/seo/seo'
import { CoursesPageComponent } from '@/page-component'
import { AppService } from '@/services/app.service'
import { GetServerSideProps } from 'next'

import { useTranslation } from 'react-i18next'

const Courses = () => {
	const { t } = useTranslation()

	return (
		<Seo
			metaTitle={
				`Sammi | ${t('course_page_title', { ns: 'seo' })}` ||
				'Sammi | All Courses'
			}
			metaDescription={
				`Sammi | ${t('course_page_description', { ns: 'seo' })}` ||
				'All courses in sammi platform just learn and relax'
			}
		>
			<CoursesPageComponent />
		</Seo>
	)
}

export default withLayout(Courses)

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
	req,
}) => {
	const courses = await AppService.getCourses(req.cookies.i18next)
	return {
		props: {
			courses,
		},
	}
}

interface PageProps {
	courses: ICourseType[]
}
