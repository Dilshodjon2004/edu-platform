import { withInstructorLayout } from '@/layouts/instructor'
import { AuthService } from '@/services/auth.service'
import { GetServerSideProps } from 'next'

const InstructorPage = () => {
	return <div>InstructorPage</div>
}

export default withInstructorLayout(InstructorPage)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const instructor = await AuthService.checkInstructor(req.cookies.refresh)

	if (!instructor) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	} else {
		return {
			redirect: {
				destination: '/instructor/students',
				permanent: false,
			},
		}
	}
}
