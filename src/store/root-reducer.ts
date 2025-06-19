import { instructorReducers } from './instructor/instructor.slice'
import { userReducers } from './user/user.slice'

export const reducer = {
	user: userReducers,
	instructor: instructorReducers,
}
