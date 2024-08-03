import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export default class LoginFormComponent implements OnInit {
    protected loginForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.internalInit();
    }

    protected internalInit() {
        this.initForm();
    }

    private initForm() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        if (!this.loginForm.valid) {
            this.markFormGroupTouched(this.loginForm);
        }
    }

    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

     isFieldInvalid(fieldName: string): boolean {
        const control = this.loginForm.get(fieldName);
        return (
            control !== null &&
            control.invalid &&
            (control.dirty || control.touched || !control.pristine)
        );
    }

    getErrorMessage(fieldName: string): string {
        const control = this.loginForm.get(fieldName);
        if (control) {
            if (control.errors?.['required']) {
                return 'Este campo es requerido.';
            }
            if (control.errors?.['minlength']) {
                return `Debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;
            }
        }
        return '';
    }
}
