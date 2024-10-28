import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewServiceComponent } from './components/new-service/new-service.component';
import { AllServicesComponent } from './components/all-services/all-services.component';

@NgModule({
  declarations: [
    NewServiceComponent,
    AllServicesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NewServiceComponent,
    AllServicesComponent
  ]
})
export class ServicesModule { }