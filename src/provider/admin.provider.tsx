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
	const { getAdminCourses, getAdminInstructors, getAdminUsers } = useActions()

	useEffect(() => {
		if (courses?.length) {
			getAdminCourses(courses)
		} else {
			getAdminCourses([])
		}
		if (instructors?.length) {
			getAdminInstructors(instructors)
		} else {
			getAdminInstructors([])
		}
		if (users?.length) {
			getAdminUsers(users)
		} else {
			getAdminUsers([])
		}
	}, [courses, instructors, users])
	return <>{children}</>
}

export default AdminProvider
