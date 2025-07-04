import { withAdminLayout } from '@/layouts/admin'
import { AdminCoursesPageComponent } from '@/page-component'

const Courses = () => {
	return <AdminCoursesPageComponent />
}

export default withAdminLayout(Courses)
