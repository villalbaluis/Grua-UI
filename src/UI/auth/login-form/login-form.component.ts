import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { StorageService } from '../../../infrastructure/services/storage.service';
import { CustomValidatorsService } from '../../../infrastructure/validators/custom-validators.service';
import { ErrorHandlerService } from '../../../infrastructure/validators/error-handler.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export default class LoginFormComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(
        private authService: AuthService,
        private customValidators: CustomValidatorsService,
        private fb: FormBuilder,
        private errorHandler: ErrorHandlerService,
        private router: Router,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.setupEvents();
        this.initForm();
    }

    private setupEvents() {
        this.storageService.removeAllLocalStorage();
        this.storageService.removeAllSessionStorage();
    }

    private initForm() {
        this.loginForm = this.fb.group({
            username: [
                '',
                [
                    Validators.required,
                    this.customValidators.minLength(3),
                    this.customValidators.maxLength(20),
                ],
            ],
            password: [
                '',
                [
                    Validators.required,
                    this.customValidators.minLength(6),
                    this.customValidators.maxLength(30),
                ],
            ],
        });
    }

    protected markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    public isFieldInvalid(fieldName: string): boolean {
        const control = this.loginForm.get(fieldName);
        return (
            control !== null &&
            control.invalid &&
            (control.dirty || control.touched)
        );
    }

    public getErrorMessage(fieldName: string): string {
        const control = this.loginForm.get(fieldName);
        return control ? this.errorHandler.getErrorMessage(control) : '';
    }

    public onSubmit() {
        try {
            if (this.loginForm.valid) {
                const { username, password } = this.loginForm.value;
                this.authService.login(username, password).subscribe({
                    next: (user) => {
                        console.log('Login exitoso', user);
                        this.router.navigate(['/dashboard']);
                    },
                    error: (error) => {
                        console.error('Error en el login', error);
                    },
                });
            } else {
                console.log('Form is invalid');
                this.markFormGroupTouched(this.loginForm);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
