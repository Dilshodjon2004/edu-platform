import { ICourseType } from '@/interfaces/course.interface'
import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorDraftCoursePageComponent } from '@/page-component'
import { AuthService } from '@/services/auth.service'
import { InstructorService } from '@/services/instructor.service'
import { GetServerSideProps, NextPage } from 'next'

const DraftCourses: NextPage = () => {
	return <InstructorDraftCoursePageComponent />
}

export default withInstructorLayout(DraftCourses)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
	req,
}) => {
	let courses: ICourseType[] = []
	const instructor = await AuthService.checkInstructor(req.cookies.refresh)

	if (!instructor) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	} else {
		courses = await InstructorService.getAllCourses(req.cookies.refresh)
	}
	return {
		props: {
			courses,
		},
	}
}

interface CoursesPageType extends Record<string, unknown> {
	courses: ICourseType[]
}
