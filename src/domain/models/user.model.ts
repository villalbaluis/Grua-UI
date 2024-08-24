export class Cliente {
    constructor(
        public id: number,
        public nombre: string,
        public cedula: string,
        public telefono: string,
        public vehiculoTransportado: string
    ) {}
}

export class Operador {
    constructor(
        public id: number,
        public nombre: string,
        public numeroIdentificacion: string,
        public numeroContacto: string,
        public tipoOperador: string
    ) {}
}

export class User {
    constructor(
        public id: number,
        public username: string,
        public type: number,
        public cliente?: Cliente,
        public operador?: Operador
    ) {}

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.username,
            json.type,
            json.cliente ? new Cliente(
                json.cliente.id,
                json.cliente.nombre,
                json.cliente.cedula,
                json.cliente.telefono,
                json.cliente.vehiculoTransportado
            ) : undefined,
            json.operador ? new Operador(
                json.operador.id,
                json.operador.nombre,
                json.operador.numeroIdentificacion,
                json.operador.numeroContacto,
                json.operador.tipoOperador
            ) : undefined
        );
    }
}

export class AuthResponse {
    constructor(public token: string, public user: User) {}

    static fromJson(json: any): AuthResponse {
        return new AuthResponse(
            json.token,
            User.fromJson(json.user)
        );
    }
}
