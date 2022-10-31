import { StateSchema } from 'app/providers/StoreProvider'

export const getUserAuthorized = (state: StateSchema) => state.user._authorized
