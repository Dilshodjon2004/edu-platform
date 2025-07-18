import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorCoursesPageComponent } from '@/page-component'
import { GetServerSideProps, NextPage } from 'next'
import { InstructorService } from '@/services/instructor.service'
import { ICourseType } from '@/interfaces/course.interface'
import { AuthService } from '@/services/auth.service'

const Courses: NextPage<CoursesPageType> = ({ courses }) => {
	return <InstructorCoursesPageComponent />
}

export default withInstructorLayout(Courses)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
	req,
}) => {
	const instructor = await AuthService.checkInstructor(req.cookies.refresh)
	let courses: ICourseType[] = []
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
