import { IBooksType } from '@/interfaces/books.interface'
import { ICourseType } from '@/interfaces/course.interface'
import { InstructorType } from '@/interfaces/instructor.interface'
import { IUserType } from '@/interfaces/user.interface'

export interface AdminProps {
	courses: ICourseType[]
	instructors: InstructorType[]
	users: IUserType[]
	books: IBooksType[]
}
