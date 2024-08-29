import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewServiceComponent } from './components/new-service/new-service.component';
import { AllServicesComponent } from './components/all-services/all-services.component';
import { GetServiceComponent } from './components/get-service/get-service.component';



@NgModule({
  declarations: [
    NewServiceComponent,
    AllServicesComponent,
    GetServiceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
