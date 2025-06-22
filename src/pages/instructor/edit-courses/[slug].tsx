import { ICourseType } from '@/interfaces/course.interface'
import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorEditDetailedCoursePageComponent } from '@/page-component'
import { InstructorService } from '@/services/instructor.service'
import { GetServerSideProps, NextPage } from 'next'

const EditDetailedCourses: NextPage = () => {
	return <InstructorEditDetailedCoursePageComponent />
}

export default withInstructorLayout(EditDetailedCourses)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
	req,
	query,
}) => {
	const course = await InstructorService.getDetailedCourse(
		req.cookies.refresh,
		query.slug as string
	)

	return {
		props: {
			course,
		},
	}
}

interface CoursesPageType extends Record<string, unknown> {
	course: ICourseType
}
