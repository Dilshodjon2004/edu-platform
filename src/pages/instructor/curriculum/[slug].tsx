import { ICourseType } from '@/interfaces/course.interface'
import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorCurriculumPageComponent } from '@/page-component'
import { AuthService } from '@/services/auth.service'
import { InstructorService } from '@/services/instructor.service'
import { GetServerSideProps } from 'next'

const CurriculumPage = () => {
	return <InstructorCurriculumPageComponent />
}

export default withInstructorLayout(CurriculumPage)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
	req,
	query,
}) => {
	let course: ICourseType
	const instructor = await AuthService.checkInstructor(req.cookies.refresh)

	if (!instructor) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	} else {
		course = await InstructorService.getDetailedCourse(
			req.cookies.refresh,
			query.slug as string
		)
	}

	return {
		props: {
			course,
		},
	}
}

interface CoursesPageType extends Record<string, unknown> {
	course: ICourseType
}
