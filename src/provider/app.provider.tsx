import { FC, ReactNode, useEffect } from 'react'
import { ICourseType } from '@/interfaces/course.interface'
import { useActions } from '@/hooks/useActions'
import { InstructorType } from '@/interfaces/instructor.interface'

interface Props {
	children: ReactNode
	courses: ICourseType[]
	course: ICourseType
	instructors: InstructorType[]
}

const AppProvider: FC<Props> = ({
	children,
	courses,
	course,
	instructors,
}): JSX.Element => {
	const { getCourses, getCourse, getInstructors } = useActions()

	useEffect(() => {
		getCourses(courses)
		getInstructors(instructors)
		if (course) {
			getCourse(course)
		}
	}, [courses, course])
	return <>{children}</>
}

export default AppProvider
