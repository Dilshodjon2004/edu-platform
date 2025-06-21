import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorEditDetailedCoursePageComponent } from '@/page-component'
import { NextPage } from 'next'

const EditDetailedCourses: NextPage = () => {
	return <InstructorEditDetailedCoursePageComponent />
}

export default withInstructorLayout(EditDetailedCourses)
