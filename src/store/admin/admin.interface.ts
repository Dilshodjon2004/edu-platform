import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IUserType } from '@/interfaces/user.interface'

export interface IAdminInitialStateType {
	isLoading: boolean
	error: string | null | unknown
	courses: ICourseType[]
	instructors: InstructorType[]
	users: IUserType[]
}

export interface ApproveAndDeleteInstructorBody {
	instructorId: string
	callback: () => void
}

export interface AdminUserInterfaceResponse {
	limit: string
	token?: string
}

export interface AdminSearchUsersInterfaceResponse {
	query: string
	limit: string
}

export interface AdminDeleteCourseInterfaceResponse {
	courseId: string
	callback: () => void
}
