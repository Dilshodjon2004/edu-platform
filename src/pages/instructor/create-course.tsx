import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorCreateCoursePageComponent } from '@/page-component'
import { NextPage } from 'next'

const CreateCourse: NextPage = () => {
	return <InstructorCreateCoursePageComponent />
}

export default withInstructorLayout(CreateCourse)
