import { userSliceActions } from './user/user.slice'
import * as userActions from './user/user.action'
export const allActions = { ...userSliceActions, ...userActions }
