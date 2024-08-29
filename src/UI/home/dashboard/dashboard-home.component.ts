import { Component, OnInit } from '@angular/core';
import { ClientOptions } from 'src/domain/enums/client-options.enum';
import { OperatorOptions } from 'src/domain/enums/operator-options.enum';
import { User, Cliente, Operador } from 'src/domain/models/user.model';
import { StorageService } from 'src/infrastructure/services/storage.service';
import { UserRole } from 'src/domain/enums/roles.enum';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
    public userInformation: User | null = null;
    public username: string = '';
    public sidebarOptions: string[] = [];
    public userRole: string = '';
    public userType: number = UserRole.CLIENT_NUMBER_TYPE;

    constructor(private storageService: StorageService) { }

    ngOnInit(): void {
        this.internalInit();
    }

    private internalInit(): void {
        try {
            this.loadUserInformation();
        } catch (error) {
            console.error('Error al cargar la información del usuario', error);
            this.handleUserInformationError();
        }
    }

    private loadUserInformation(): void {
        this.userInformation = this.storageService.getSessionStorage('userDetailsSession');
        if (this.userInformation) {
            this.setUsernameAndSidebarOptions(this.userInformation);
        }
    }

    private setUsernameAndSidebarOptions(user: User): void {
        const defaultUsername = 'User Default';
        switch (user.type) {
            case UserRole.CLIENT_NUMBER_TYPE:
                this.username = (user.cliente as Cliente)?.nombre || defaultUsername;
                this.sidebarOptions = Object.values(ClientOptions);
                this.userRole = 'Cliente';
                this.userType = UserRole.CLIENT_NUMBER_TYPE;
                break;

            case UserRole.OPERATOR_NUMBER_TYPE:
                this.username = (user.operador as Operador)?.nombre || defaultUsername;
                this.sidebarOptions = Object.values(OperatorOptions);
                this.userRole = 'Operador';
                this.userType = UserRole.OPERATOR_NUMBER_TYPE;
                break;
            default:
                this.username = defaultUsername;
                this.userRole = defaultUsername;
                this.sidebarOptions = [];
                this.userType = UserRole.CLIENT_NUMBER_TYPE;
                break;
        }
    }

    private handleUserInformationError(): void {
        this.username = 'User Default';
        this.sidebarOptions = [];
        this.userRole = 'Default';
    }
}
