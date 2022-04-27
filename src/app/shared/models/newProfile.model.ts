import {ResponseUser} from './ResponseUser.model'

export type ChangeProfileType = ResponseUser & { password: string };
// export type ChangeProfileType = NewUser;