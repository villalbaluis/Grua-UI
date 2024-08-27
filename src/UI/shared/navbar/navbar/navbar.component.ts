import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    @Input() username: string = 'Default User';
    @Input() sidebarOptions: string[] = [];

    public firstName: string = '';
    public lastName: string = '';
    public initials: string = '';
    public backgroundColor: string = '';
    protected isSidebarOpen = false;
    protected isDropdownOpen = false;

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

    public logout() {
        console.log('Logging out...');
    }

}
