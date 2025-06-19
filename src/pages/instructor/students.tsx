import { withInstructorLayout } from '@/layouts/instructor'
import { StudentsPageComponent } from '@/page-component'
import { NextPage } from 'next'

const Students: NextPage = () => {
	return <StudentsPageComponent />
}

export default withInstructorLayout(Students)
