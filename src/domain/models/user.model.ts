export interface IUser {
    id: number;
    username: string;
    type: number;
}

export class User implements IUser {
    constructor(
        public id: number,
        public username: string,
        public type: number
    ) {}
}

export interface IAuthResponse {
    token: string;
    user: IUser;
}

export class AuthResponse implements IAuthResponse {
    constructor(public token: string, public user: User) {}

    static fromJson(json: any): AuthResponse {
        return new AuthResponse(
            json.token,
            new User(json.user.id, json.user.username, json.user.type)
        );
    }
}
