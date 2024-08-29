import { UserRole } from "./roles.enum";

export class ClientOptionsRedirects {
    private roles: any = {
        [UserRole.CLIENT_NUMBER_TYPE]: {
            routes: [
                {
                    name: 'Solicitar Servicio',
                    availability: true,
                    route: '/new_service',
                    icon: '',
                    enum_Key: 'SERVICE'
                },
                {
                    name: 'Listado de Servicios',
                    availability: true,
                    route: '/all_services',
                    icon: '',
                    enum_Key: 'OWN_SERVICES'
                }
            ],
        },
        [UserRole.OPERATOR_NUMBER_TYPE]: {
            routes: [
                {
                    name: '"Mis gruas',
                    availability: true,
                    route: '/cranes',
                    icon: '',
                    enum_Key: 'CRANES'
                },
                {
                    name: 'Mis rutas',
                    availability: true,
                    route: '/all_services',
                    icon: '',
                    enum_Key: 'ROUTES'
                },
                {
                    name: 'Mantenimientos',
                    availability: true,
                    route: '/maintenance',
                    icon: '',
                    enum_Key: 'MAINTENANCE'
                }
            ],
        },
    };

    constructor() {}

    public getRoleByType(type: number): any {
        return this.roles[type] || null;
    }

    public getRouteByEnumName(type: number, enumKey: string): string | null {
        const roleRoutes = this.getRoleByType(type);
        if (roleRoutes) {
            const route = roleRoutes.routes.find((r: any) => r.name === enumKey);
            return route ? route.route : null;
        }
        return null;
    }
}
