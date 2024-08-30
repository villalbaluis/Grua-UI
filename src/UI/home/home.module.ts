import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    ServicesModule
  ]
})
export class HomeModule { }