import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorCreateCoursePageComponent } from '@/page-component'
import { AuthService } from '@/services/auth.service'
import { GetServerSideProps, NextPage } from 'next'

const CreateCourse: NextPage = () => {
	return <InstructorCreateCoursePageComponent />
}

export default withInstructorLayout(CreateCourse)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const instructor = await AuthService.checkInstructor(req.cookies.refresh)

	if (!instructor) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}
