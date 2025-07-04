import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorRevenuePageComponent } from '@/page-component'
import { AuthService } from '@/services/auth.service'
import { GetServerSideProps, NextPage } from 'next'

const Revenue: NextPage = () => {
	return <InstructorRevenuePageComponent />
}

export default withInstructorLayout(Revenue)

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
