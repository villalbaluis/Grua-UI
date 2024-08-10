import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {
  constructor() { }

  // Validador de longitud mínima
  minLength(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value && control.value.length < min) {
        return { 'minlength': {requiredLength: min, actualLength: control.value.length} };
      }
      return null;
    };
  }

  // Validador de longitud máxima
  maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value && control.value.length > max) {
        return { 'maxlength': {requiredLength: max, actualLength: control.value.length} };
      }
      return null;
    };
  }

  // Validador de correo electrónico
  email(): ValidatorFn {
    return Validators.email;
  }

  // Validador numérico
  numeric(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : {'numeric': {value: control.value}};
    };
  }

  // Puedes agregar más validadores personalizados aquí
}