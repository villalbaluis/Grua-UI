export interface IUser {
    id: number;
    username: string;
    type: number;
}

export interface IAuthResponse {
    token: string;
    user: IUser;
}
