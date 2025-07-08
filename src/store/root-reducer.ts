import { adminReducers } from './admin/admin.slice'
import { booksReducers } from './books/books.slice'
import { courseReducers } from './course/course.slice'
import { instructorReducers } from './instructor/instructor.slice'
import { lessonReducers } from './lesson/lesson.slice'
import { sectionReducers } from './section/section.slice'
import { userReducers } from './user/user.slice'

export const reducer = {
	user: userReducers,
	instructor: instructorReducers,
	course: courseReducers,
	section: sectionReducers,
	lesson: lessonReducers,
	admin: adminReducers,
	books: booksReducers,
}
