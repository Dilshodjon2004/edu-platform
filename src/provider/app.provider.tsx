import { FC, ReactNode, useEffect } from 'react'
import { ICourseType } from '@/interfaces/course.interface'
import { useActions } from '@/hooks/useActions'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IBooksType } from '@/interfaces/books.interface'

interface Props {
	children: ReactNode
	courses: ICourseType[]
	course: ICourseType
	instructors: InstructorType[]
	books: IBooksType[]
}

const AppProvider: FC<Props> = ({
	children,
	courses,
	course,
	instructors,
	books,
}): JSX.Element => {
	const { getCourses, getCourse, getInstructors, getBooks } = useActions()

	useEffect(() => {
		if (courses?.length) {
			getCourses(courses)
		} else {
			getCourses([])
		}
		if (instructors?.length) {
			getInstructors(instructors)
		} else {
			getInstructors([])
		}
		if (course) {
			getCourse(course)
		}
		if (books?.length) {
			getBooks(books)
		} else {
			getBooks([])
		}
	}, [courses, course])
	return <>{children}</>
}

export default AppProvider
