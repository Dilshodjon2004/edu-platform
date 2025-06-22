import { useActions } from '@/hooks/useActions'
import { ICourseType } from '@/interfaces/course.interface'
import { FC, ReactNode, useEffect } from 'react'

interface Props {
	children: ReactNode
	courses: ICourseType[]
	course: ICourseType
}

const InstructorProvider: FC<Props> = ({
	children,
	course,
	courses,
}): JSX.Element => {
	const { instructorAllCourses, instructorDetailedCourse } = useActions()

	useEffect(() => {
		if (courses.length) {
			instructorAllCourses(courses)
		}
		if (course) {
			instructorDetailedCourse(course)
		}
	}, [courses, course])

	return <>{children}</>
}

export default InstructorProvider
