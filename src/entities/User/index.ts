export { UserRole } from './model/const/user'
export { getUserAuthData } from './model/selector/getUserAuthData/getUserAuthData'
export { getUserInited } from './model/selector/getUserInited/getUserInited'
export {
  getUserRole,
  isUserAdmin,
  isUserManager,
} from './model/selector/getUserRole/getUserRole'
export { userActions, userReducer } from './model/slice/userSlice'
export type { User, UserSchema } from './model/types/user'
