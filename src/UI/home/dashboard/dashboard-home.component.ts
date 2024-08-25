// dashboard-home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  username: string = 'Juan Perez';  // Nombre de usuario para mostrar
  sidebarOptions: string[] = ['Perfil', 'Configuraciones', 'Cerrar sesión'];  // Opciones del sidebar
}
