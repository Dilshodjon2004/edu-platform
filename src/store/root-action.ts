import { userSliceActions } from './user/user.slice'
import * as userActions from './user/user.action'
import { instructorSliceActions } from './instructor/instructor.slice'
import * as instructorActions from './instructor/instructor.action'
import { courseSliceActions } from './course/course.slice'
import * as courseActions from './course/course.action'
export const allActions = {
	...userSliceActions,
	...userActions,
	...instructorSliceActions,
	...instructorActions,
	...courseSliceActions,
	...courseActions,
}
