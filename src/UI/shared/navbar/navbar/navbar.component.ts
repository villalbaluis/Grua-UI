import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/domain/enums/roles.enum';
import { ClientOptionsRedirects } from 'src/domain/enums/routes.enum';
import { ModalService } from 'src/infrastructure/services/modal.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    @Input() username: string = 'Default User';
    @Input() userRole: string = 'Default Role';
    @Input() sidebarOptions: string[] = [];
    @Input() userType: number = UserRole.CLIENT_NUMBER_TYPE;

    public firstName: string = '';
    public lastName: string = '';
    public initials: string = '';
    public backgroundColor: string = '';
    protected isSidebarOpen = false;
    protected isDropdownOpen = false;
    private clientOptionsRedirects: ClientOptionsRedirects;

    constructor(
        private router: Router,
        private modalService: ModalService
    ) {
        this.clientOptionsRedirects = new ClientOptionsRedirects();
    }
    ngOnInit() {
        this.initials = this.getInitials();
        this.backgroundColor = this.getRandomColor();
    }

    private getInitials(): string {
        const nameParts = this.username.split(' ');
        this.firstName = nameParts[0];
        this.lastName = nameParts[1] || '';

        const firstInitial = this.firstName.charAt(0).toUpperCase();
        const lastInitial = this.lastName.charAt(0).toUpperCase();

        return `${firstInitial}${lastInitial}`;
    }

    private getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    public toggleDropdown(event: Event) {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    public navigateToRoute(option: string) {
        const route = this.clientOptionsRedirects.getRouteByEnumName(this.userType, option);
        if (route) {
            this.router.navigate([route]);
        } else {
            this.modalService.showErrorModal("No se ha encontrado una ruta relacionada.");
        }
    }

    public logout() {
        console.log('Logging out...');
    }

}
