import { userSliceActions } from './user/user.slice'
import * as userActions from './user/user.action'
import { instructorSliceActions } from './instructor/instructor.slice'
import * as instructorActions from './instructor/instructor.action'
import { courseSliceActions } from './course/course.slice'
import * as courseActions from './course/course.action'
import { sectionSliceActions } from './section/section.slice'
import * as sectionActions from './section/section.action'
import { lessonSliceActions } from './lesson/lesson.slice'
import * as lessonActions from './lesson/lesson.action'
import { adminSliceActions } from './admin/admin.slice'
import * as adminActions from './admin/admin.action'

export const allActions = {
	...userSliceActions,
	...userActions,
	...instructorSliceActions,
	...instructorActions,
	...courseSliceActions,
	...courseActions,
	...sectionSliceActions,
	...sectionActions,
	...lessonSliceActions,
	...lessonActions,
	...adminSliceActions,
	...adminActions,
}
