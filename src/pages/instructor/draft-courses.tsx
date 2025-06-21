import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorDraftCoursePageComponent } from '@/page-component'
import { NextPage } from 'next'

const DraftCourses: NextPage = () => {
	return <InstructorDraftCoursePageComponent />
}

export default withInstructorLayout(DraftCourses)
