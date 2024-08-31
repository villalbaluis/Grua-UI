import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { NewServiceComponent } from '../services/components/new-service/new-service.component';
import { AllServicesComponent } from '../services/components/all-services/all-services.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      { path: 'new_service', component: NewServiceComponent },
      { path: 'all_services', component: AllServicesComponent },
      { path: '', redirectTo: 'all_services', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }