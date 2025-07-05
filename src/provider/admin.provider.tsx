import { useActions } from '@/hooks/useActions'
import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IUserType } from '@/interfaces/user.interface'
import { FC, ReactNode, useEffect } from 'react'

interface Props {
	children: ReactNode
	courses: ICourseType[]
	instructors: InstructorType[]
	users: IUserType[]
}

const AdminProvider: FC<Props> = ({
	children,
	courses,
	instructors,
	users,
}): JSX.Element => {
	const { getCourses, getInstructors, getUsers } = useActions()

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
		if (users?.length) {
			getUsers(users)
		} else {
			getUsers([])
		}
	}, [courses, instructors, users])
	return <>{children}</>
}

export default AdminProvider
