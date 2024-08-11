import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }

  getErrorMessage(control: AbstractControl): string {
    if (control.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido.';
      }
      if (control.errors['minlength']) {
        return `Debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;
      }
      if (control.errors['maxlength']) {
        return `No debe exceder ${control.errors['maxlength'].requiredLength} caracteres.`;
      }
      if (control.errors['email']) {
        return 'Debe ser un correo electrónico válido.';
      }
      if (control.errors['numeric']) {
        return 'Debe ser un valor numérico.';
      }
      // Puedes agregar más mensajes de error aquí
    }
    return '';
  }
}