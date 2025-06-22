import { ICourseType } from '@/interfaces/course.interface'
import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorEditCoursePageComponent } from '@/page-component'
import { InstructorService } from '@/services/instructor.service'
import { GetServerSideProps, NextPage } from 'next'

const EditCourses: NextPage = () => {
	return <InstructorEditCoursePageComponent />
}

export default withInstructorLayout(EditCourses)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
	req,
}) => {
	const courses = await InstructorService.getAllCourses(req.cookies.refresh)

	return {
		props: {
			courses,
		},
	}
}

interface CoursesPageType extends Record<string, unknown> {
	courses: ICourseType[]
}
