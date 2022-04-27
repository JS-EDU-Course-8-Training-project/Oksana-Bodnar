export interface NewUser {
    [x: string]: any;
    username: string,
    email: string,
    password?: string;
};