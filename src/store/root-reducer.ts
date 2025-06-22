import { courseReducers } from './course/course.slice'
import { instructorReducers } from './instructor/instructor.slice'
import { userReducers } from './user/user.slice'

export const reducer = {
	user: userReducers,
	instructor: instructorReducers,
	course: courseReducers,
}
