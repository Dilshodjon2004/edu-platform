import { withAdminLayout } from '@/layouts/admin'
import { AdminInstructorPageComponent } from '@/page-component'

const Instructors = () => {
	return <AdminInstructorPageComponent />
}

export default withAdminLayout(Instructors)
