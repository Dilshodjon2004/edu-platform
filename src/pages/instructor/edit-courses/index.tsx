import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorEditCoursePageComponent } from '@/page-component'
import { NextPage } from 'next'

const EditCourses: NextPage = () => {
	return <InstructorEditCoursePageComponent />
}

export default withInstructorLayout(EditCourses)
