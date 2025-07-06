import { InstructorType } from '@/interfaces/instructor.interface'
import { withAdminLayout } from '@/layouts/admin'
import { AdminInstructorPageComponent } from '@/page-component'
import { AdminService } from '@/services/admin.service'
import { GetServerSideProps } from 'next'

const Instructors = () => {
	return <AdminInstructorPageComponent />
}

export default withAdminLayout(Instructors)

export const getServerSideProps: GetServerSideProps<
	InstructorPageType
> = async ({ req }) => {
	const instructors = await AdminService.getAllInstructors(req.cookies.refresh)
	return {
		props: {
			instructors,
		},
	}
}

interface InstructorPageType extends Record<string, unknown> {
	instructors: InstructorType[]
}
