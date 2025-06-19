import { userSliceActions } from './user/user.slice'
import * as userActions from './user/user.action'
import { instructorSliceActions } from './instructor/instructor.slice'
import * as instructorActions from './instructor/instructor.action'

export const allActions = {
	...userSliceActions,
	...userActions,
	...instructorSliceActions,
	...instructorActions,
}
