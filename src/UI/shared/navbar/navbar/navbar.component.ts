// navbar.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() username: string = 'Usuario';  // Nombre de usuario por defecto
  @Input() sidebarOptions: string[] = []; // Opciones para el sidebar

  isSidebarOpen = false; // Controla la visibilidad del sidebar

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
