import {NewUser} from './newUser.model'

export type ChangeProfileType = NewUser & { password: string };