import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import LoginFormComponent from './login-form/login-form.component';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoginFormComponent
  ]
})
export class AuthModule { }