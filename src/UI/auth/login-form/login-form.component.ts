import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorsService } from '../../../infrastructure/validators/custom-validators.service';
import { ErrorHandlerService } from '../../../infrastructure/validators/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export default class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.customValidators.minLength(3), this.customValidators.maxLength(20)]],
      password: ['', [Validators.required, this.customValidators.minLength(6), this.customValidators.maxLength(30)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted', this.loginForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al servidor
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    return control ? this.errorHandler.getErrorMessage(control) : '';
  }
}