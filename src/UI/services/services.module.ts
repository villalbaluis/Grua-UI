import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewServiceComponent } from './components/new-service/new-service.component';

@NgModule({
  declarations: [NewServiceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [NewServiceComponent]
})
export class ServicesModule { }